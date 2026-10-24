// src/components/visualizations/DirectAirCaptureVisualizer.tsx
// Interactive Visualizer: Direct Air Capture (DAC) & Separation Thermodynamics
// Conforms to: IUPAC Separation Thermodynamics, IEA Net-Zero Roadmap & Vietnam GDPT 2018 (Hóa học 11 & 12: Chu trình cacbon, Cân bằng muối cacbonat, Xút hóa kiềm & Giảm phát thải khí nhà kính)

import React, { useState, useMemo } from 'react';
import {
  Wind,
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
  Flame,
  Factory,
  DollarSign,
  Sun,
  Filter
} from 'lucide-react';
import {
  DacTechnologyType,
  DacHeatSource,
  DacOperatingConditions,
  calculateThermodynamicMinimumWork,
  getDacReactionCycle,
  simulateDacProcess,
  compareDacTechnologies
} from '../../domain/directAirCaptureEngine';
import { sound } from '../../audio/soundEngine';

type DacTabMode = 'CLOSED_LOOP_CHEMICAL_CYCLE' | 'THERMODYNAMICS_AND_ENERGY' | 'NET_ZERO_ECONOMICS_AND_PTX';

export const DirectAirCaptureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DacTabMode>('CLOSED_LOOP_CHEMICAL_CYCLE');
  const [selectedTech, setSelectedTech] = useState<DacTechnologyType>('LIQUID_KOH');
  const [selectedHeatSource, setSelectedHeatSource] = useState<DacHeatSource>('GEOTHERMAL');

  // Sliders
  const [airCo2Ppm, setAirCo2Ppm] = useState<number>(420);
  const [ambientTempC, setAmbientTempC] = useState<number>(20);
  const [airFlowRateM3h, setAirFlowRateM3h] = useState<number>(50000);
  const [captureEfficiency, setCaptureEfficiency] = useState<number>(0.75);
  const [electricityPriceUsdKwh, setElectricityPriceUsdKwh] = useState<number>(0.04);
  const [thermalEnergyPriceUsdGj, setThermalEnergyPriceUsdGj] = useState<number>(8.0);
  const [activeReactionStep, setActiveReactionStep] = useState<number>(1);

  // Simulation results
  const simResult = useMemo(() => {
    const conditions: DacOperatingConditions = {
      airCo2Ppm,
      ambientTempC,
      airFlowRateM3h,
      captureEfficiency,
      heatSource: selectedHeatSource,
      electricityPriceUsdKwh,
      thermalEnergyPriceUsdGj
    };
    return simulateDacProcess(selectedTech, conditions);
  }, [
    selectedTech,
    airCo2Ppm,
    ambientTempC,
    airFlowRateM3h,
    captureEfficiency,
    selectedHeatSource,
    electricityPriceUsdKwh,
    thermalEnergyPriceUsdGj
  ]);

  const reactionCycle = useMemo(() => {
    return getDacReactionCycle(selectedTech);
  }, [selectedTech]);

  const techComparisons = useMemo(() => {
    return compareDacTechnologies();
  }, []);

  const handleTabChange = (tab: DacTabMode) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  const handleTechChange = (tech: DacTechnologyType) => {
    sound.playUiClick();
    setSelectedTech(tech);
    setActiveReactionStep(1);
  };

  const handleHeatSourceChange = (source: DacHeatSource) => {
    sound.playUiClick();
    setSelectedHeatSource(source);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
              <Wind className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Hấp Thụ CO₂ Trực Tiếp Từ Khí Quyển (Direct Air Capture - DAC)
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  IEA Net-Zero 2050
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhiệt động học phân tách khí cực loãng (420 ppm), Chu trình hóa học dung môi KOH & Hấp phụ chân không TVSA
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('CLOSED_LOOP_CHEMICAL_CYCLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CLOSED_LOOP_CHEMICAL_CYCLE'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Chu Trình Phản Ứng Khép Kín
          </button>
          <button
            onClick={() => handleTabChange('THERMODYNAMICS_AND_ENERGY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'THERMODYNAMICS_AND_ENERGY'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Nhiệt Động Học & Năng Lượng
          </button>
          <button
            onClick={() => handleTabChange('NET_ZERO_ECONOMICS_AND_PTX')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'NET_ZERO_ECONOMICS_AND_PTX'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Kinh Tế LCOE & Power-to-X
          </button>
        </div>
      </div>

      {/* Technology Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Công Nghệ Hấp Thụ:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTechChange('LIQUID_KOH')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'LIQUID_KOH'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Dung môi lỏng KOH / CaCO₃ (Oxy/Carbon Eng)
            </button>
            <button
              onClick={() => handleTechChange('SOLID_AMINE_TVSA')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'SOLID_AMINE_TVSA'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Chất hấp phụ rắn TVSA Amine (Climeworks)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Thu giữ CO₂:</span>
            <span className="text-emerald-400 font-bold">{simResult.co2CapturedKgH} kg/h</span>
            <span className="text-slate-500">({simResult.co2CapturedTonsPerYear} tấn/năm)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Chi phí:</span>
            <span className="text-cyan-400 font-bold">${simResult.costBreakdown.totalCostPerTonCo2}</span>
            <span className="text-slate-500">/ tấn CO₂</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {/* TAB 1: CLOSED LOOP CHEMICAL CYCLE */}
        {activeTab === 'CLOSED_LOOP_CHEMICAL_CYCLE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* SVG Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Sơ đồ Chu Trình Tuần Hoàn Vật Chất Khép Kín:</span>
                <span className="font-mono text-cyan-400">
                  {selectedTech === 'LIQUID_KOH' ? '4 Công đoạn (Calciner 900°C)' : '3 Công đoạn (TVSA 100°C, 0.2 bar)'}
                </span>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                {selectedTech === 'LIQUID_KOH' ? (
                  <svg viewBox="0 0 700 420" className="w-full h-full">
                    <defs>
                      <linearGradient id="airInflowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="calcinerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Step 1: Air Contactor */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(1); }}
                    >
                      <rect
                        x="30"
                        y="50"
                        width="140"
                        height="200"
                        rx="12"
                        fill="#0f172a"
                        stroke={activeReactionStep === 1 ? '#38bdf8' : '#334155'}
                        strokeWidth={activeReactionStep === 1 ? '3' : '1.5'}
                      />
                      {/* Fan Blades */}
                      <circle cx="100" cy="90" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="80" y1="90" x2="120" y2="90" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                      <line x1="100" y1="70" x2="100" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                      <text x="100" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">1. Tháp Tiếp Xúc</text>
                      <text x="100" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">Phun KOH 2.0M</text>
                      <text x="100" y="185" fill="#38bdf8" fontSize="9" textAnchor="middle">Khí vào: 420 ppm</text>
                      <text x="100" y="200" fill="#4ade80" fontSize="9" textAnchor="middle">Khí sạch ra: 105 ppm</text>
                      <text x="100" y="230" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                        2 KOH + CO₂ → K₂CO₃
                      </text>
                    </g>

                    {/* Arrow 1 -> 2 (K2CO3 solution) */}
                    <path d="M 170 150 L 230 150" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" strokeDasharray="4 2" />
                    <text x="200" y="140" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">K₂CO₃(aq)</text>

                    {/* Step 2: Pellet Reactor */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(2); }}
                    >
                      <rect
                        x="230"
                        y="80"
                        width="130"
                        height="140"
                        rx="12"
                        fill="#0f172a"
                        stroke={activeReactionStep === 2 ? '#f59e0b' : '#334155'}
                        strokeWidth={activeReactionStep === 2 ? '3' : '1.5'}
                      />
                      <circle cx="295" cy="115" r="16" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="295" y="120" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">v</text>
                      <text x="295" y="150" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">2. Tạo Hạt CaCO₃</text>
                      <text x="295" y="168" fill="#94a3b8" fontSize="10" textAnchor="middle">+ Ca(OH)₂ tái sinh KOH</text>
                      <text x="295" y="185" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">Kết tinh hạt CaCO₃</text>
                    </g>

                    {/* KOH Recycle loop back to Tower 1 */}
                    <path d="M 295 80 L 295 30 L 100 30 L 100 50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="200" y="24" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Hồi lưu KOH 2.0M</text>

                    {/* Arrow 2 -> 3 (CaCO3 solid pellets) */}
                    <path d="M 360 150 L 420 150" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="390" y="140" fill="#f97316" fontSize="9" textAnchor="middle" fontWeight="bold">CaCO₃(s)</text>

                    {/* Step 3: Calciner (900°C) */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(3); }}
                    >
                      <rect
                        x="420"
                        y="50"
                        width="140"
                        height="200"
                        rx="12"
                        fill="url(#calcinerGrad)"
                        fillOpacity="0.15"
                        stroke={activeReactionStep === 3 ? '#ef4444' : '#f97316'}
                        strokeWidth={activeReactionStep === 3 ? '3' : '1.5'}
                      />
                      <rect x="440" y="70" width="100" height="40" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                      <text x="490" y="95" fill="#fef2f2" fontSize="13" fontWeight="bold" textAnchor="middle">900°C</text>
                      <text x="490" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">3. Lò Nung Vôi</text>
                      <text x="490" y="165" fill="#fca5a5" fontSize="10" textAnchor="middle">Oxy-combustion / Plasma</text>
                      <text x="490" y="185" fill="#f87171" fontSize="9" textAnchor="middle">CaCO₃ → CaO + CO₂↑</text>
                      <text x="490" y="225" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
                        CO₂ sạch 100% → PtX
                      </text>
                    </g>

                    {/* Arrow 3 -> 4 (CaO quicklime) */}
                    <path d="M 490 250 L 490 320 L 360 320" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="430" y="312" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">CaO(s) vôi sống</text>

                    {/* Step 4: Slaker */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(4); }}
                    >
                      <rect
                        x="230"
                        y="270"
                        width="130"
                        height="100"
                        rx="12"
                        fill="#0f172a"
                        stroke={activeReactionStep === 4 ? '#38bdf8' : '#334155'}
                        strokeWidth={activeReactionStep === 4 ? '3' : '1.5'}
                      />
                      <text x="295" y="300" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">4. Tôi Vôi (Slaker)</text>
                      <text x="295" y="318" fill="#94a3b8" fontSize="10" textAnchor="middle">+ H₂O → Ca(OH)₂</text>
                      <text x="295" y="335" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Tỏa nhiệt mạnh (100°C)</text>
                    </g>

                    {/* Loop 4 back up to 2 (Ca(OH)2) */}
                    <path d="M 295 270 L 295 220" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="325" y="248" fill="#38bdf8" fontSize="9" textAnchor="start" fontWeight="bold">Ca(OH)₂</text>

                    {/* Product CO2 arrow leaving Calciner */}
                    <path d="M 560 150 L 650 150" stroke="#4ade80" strokeWidth="3" markerEnd="url(#arrow)" />
                    <circle cx="660" cy="150" r="14" fill="#22c55e" />
                    <text x="660" y="154" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">CO₂</text>
                    <text x="605" y="138" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">Khí CO₂ sạch</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 700 420" className="w-full h-full">
                    {/* TVSA Solid Sorbent Cycle */}
                    {/* Step 1: Adsorption Chamber */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(1); }}
                    >
                      <rect
                        x="50"
                        y="70"
                        width="170"
                        height="260"
                        rx="14"
                        fill="#0f172a"
                        stroke={activeReactionStep === 1 ? '#14b8a6' : '#334155'}
                        strokeWidth={activeReactionStep === 1 ? '3' : '1.5'}
                      />
                      <rect x="70" y="90" width="130" height="70" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
                      <text x="135" y="125" fill="#ccfbf1" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Sợi Xenlulo + PEI
                      </text>
                      <text x="135" y="145" fill="#5eead4" fontSize="9" textAnchor="middle">
                        Amine R-NH₂
                      </text>
                      <text x="135" y="190" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        1. Hấp Phụ Hóa Học
                      </text>
                      <text x="135" y="210" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        25°C, Áp suất 1.0 bar
                      </text>
                      <text x="135" y="235" fill="#14b8a6" fontSize="9" fontWeight="bold" textAnchor="middle">
                        2 R-NH₂ + CO₂
                      </text>
                      <text x="135" y="250" fill="#14b8a6" fontSize="9" fontWeight="bold" textAnchor="middle">
                        → Carbamate R-NHCOO⁻
                      </text>
                      <text x="135" y="290" fill="#38bdf8" fontSize="10" textAnchor="middle">
                        Gió thổi qua màng xốp
                      </text>
                    </g>

                    {/* Transition 1 -> 2 */}
                    <path d="M 220 200 L 280 200" stroke="#14b8a6" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="250" y="190" fill="#14b8a6" fontSize="9" textAnchor="middle" fontWeight="bold">Đóng van hút CK</text>

                    {/* Step 2: Desorption under Vacuum & 100°C */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(2); }}
                    >
                      <rect
                        x="280"
                        y="70"
                        width="180"
                        height="260"
                        rx="14"
                        fill="#0f172a"
                        stroke={activeReactionStep === 2 ? '#f59e0b' : '#334155'}
                        strokeWidth={activeReactionStep === 2 ? '3' : '1.5'}
                      />
                      <rect x="300" y="90" width="140" height="50" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                      <text x="370" y="112" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle">
                        100°C | 0.2 bar Chân Không
                      </text>
                      <text x="370" y="130" fill="#fcd34d" fontSize="9" textAnchor="middle">
                        Nhiệt địa nhiệt / Hơi thải
                      </text>
                      <text x="370" y="175" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        2. Nhả Hấp Phụ TVSA
                      </text>
                      <text x="370" y="195" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Carbamate phân hủy giải phóng
                      </text>
                      <text x="370" y="215" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                        R-NHCOO⁻ + Nhiệt →
                      </text>
                      <text x="370" y="230" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                        2 R-NH₂ + CO₂↑ + H₂O↑
                      </text>
                      <text x="370" y="270" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Độ tinh khiết CO₂ &gt; 98%
                      </text>
                      <text x="370" y="300" fill="#38bdf8" fontSize="9" textAnchor="middle">
                        Bơm hút chân không xả khí
                      </text>
                    </g>

                    {/* Transition 2 -> 3 */}
                    <path d="M 460 200 L 510 200" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* Step 3: Condenser & Water Recovery */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => { sound.playUiClick(); setActiveReactionStep(3); }}
                    >
                      <rect
                        x="510"
                        y="70"
                        width="150"
                        height="260"
                        rx="14"
                        fill="#0f172a"
                        stroke={activeReactionStep === 3 ? '#38bdf8' : '#334155'}
                        strokeWidth={activeReactionStep === 3 ? '3' : '1.5'}
                      />
                      <circle cx="585" cy="120" r="22" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="585" y="125" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                        H₂O(l)
                      </text>
                      <text x="585" y="175" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        3. Ngưng Tụ Nước Sạch
                      </text>
                      <text x="585" y="195" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Thu hồi 1.2 m³ nước/tấn CO₂
                      </text>
                      <text x="585" y="225" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Phụ phẩm có ích vùng khô hạn!
                      </text>
                      <text x="585" y="260" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
                        CO₂ khô → Nén 100 bar
                      </text>
                      <text x="585" y="280" fill="#4ade80" fontSize="9" textAnchor="middle">
                        (Bơm xuống lòng đất hoặc PtX)
                      </text>
                    </g>

                    {/* Sorbent regeneration loop */}
                    <path d="M 370 70 L 370 30 L 135 30 L 135 70" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="250" y="22" fill="#2dd4bf" fontSize="9" textAnchor="middle" fontWeight="bold">
                      Làm nguội 25°C, Tái sinh &gt; 3,000 chu kỳ
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Step Explanation & Reaction Details */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Chi Tiết Phản Ứng Công Đoạn Được Chọn:
                </span>
                {(() => {
                  const step = reactionCycle.find(s => s.stepNumber === activeReactionStep) || reactionCycle[0];
                  return (
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
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

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 font-mono text-xs text-emerald-400 font-semibold">
                        {step.chemicalEquation}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-1">
                        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 block">Nhiệt độ hoạt động:</span>
                          <span className="text-amber-400 font-bold">{step.temperatureC}°C</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 block">Áp suất vận hành:</span>
                          <span className="text-cyan-400 font-bold">{step.pressureBar} bar</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2 p-2.5 rounded bg-slate-900/40 border border-slate-800/60">
                        {step.description}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Comparative Feature Matrix */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  So Sánh Hai Công Nghệ Trụ Cột:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {techComparisons.map(item => (
                    <div
                      key={item.type}
                      onClick={() => handleTechChange(item.type)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        selectedTech === item.type
                          ? 'bg-cyan-950/30 border-cyan-500/50 shadow-inner'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-slate-200 block text-xs">{item.name}</span>
                      <div className="mt-1 text-slate-400 font-mono space-y-0.5 text-[11px]">
                        <div>Nhiệt nhả: <span className="text-amber-400 font-bold">{item.desorptionTempC}°C</span></div>
                        <div>Nhiệt năng: <span className="text-slate-200">{item.thermalEnergyGjTon} GJ/tấn</span></div>
                        <div>Điện năng: <span className="text-cyan-400">{item.electricEnergyKwhTon} kWh/tấn</span></div>
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-400/90 leading-tight">
                        ★ {item.keyAdvantage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THERMODYNAMICS AND ENERGY */}
        {activeTab === 'THERMODYNAMICS_AND_ENERGY' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Controls & Dilution Penalty Calculation */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Tham Số Vận Hành Quạt & Khí Quyển:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Khảo sát ảnh hưởng của nồng độ CO₂ loãng và lưu lượng gió công nghiệp
                </p>
              </div>

              {/* Slider 1: CO2 ppm */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Nồng độ CO₂ không khí:</span>
                  <span className="font-mono text-cyan-400 font-bold">{airCo2Ppm} ppm</span>
                </div>
                <input
                  type="range"
                  min="380"
                  max="1000"
                  step="10"
                  value={airCo2Ppm}
                  onChange={e => setAirCo2Ppm(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>380 ppm (Trước CMCN)</span>
                  <span>420 ppm (Hiện tại)</span>
                  <span>1000 ppm (Đô thị ô nhiễm)</span>
                </div>
              </div>

              {/* Slider 2: Air Flow Rate */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Lưu lượng khí cưỡng bức:</span>
                  <span className="font-mono text-amber-400 font-bold">{airFlowRateM3h.toLocaleString()} m³/h</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={airFlowRateM3h}
                  onChange={e => setAirFlowRateM3h(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Capture Efficiency */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Hiệu suất thu hồi CO₂ màng/tháp:</span>
                  <span className="font-mono text-emerald-400 font-bold">{(captureEfficiency * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.90"
                  step="0.05"
                  value={captureEfficiency}
                  onChange={e => setCaptureEfficiency(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Dilution Penalty Spotlight Box */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Hình Phạt Pha Loãng (Dilution Penalty):
                </span>
                <div className="flex justify-between text-slate-300">
                  <span>Công nhiệt động tối thiểu W_min:</span>
                  <span className="text-cyan-400 font-bold">{simResult.thermodynamicMinWorkKwhTon} kWh/tấn CO₂</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Năng lượng thực tế cần cấp:</span>
                  <span className="text-amber-400 font-bold">{simResult.totalEnergyKwhTon} kWh/tấn CO₂</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hiệu suất Định luật 2 Nhiệt động:</span>
                  <span className="text-emerald-400 font-bold">{simResult.secondLawEfficiencyPct}%</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans leading-tight pt-1 border-t border-slate-800">
                  Do CO₂ trong không khí chỉ chiếm 0.042% (cực loãng so với 12% ở ống khói nhiệt điện), entropy hòa trộn rất lớn đòi hỏi quạt phải luân chuyển hơn 2,000 tấn không khí để thu gom được 1 tấn CO₂!
                </p>
              </div>
            </div>

            {/* Energy Partitioning Chart & Metrics */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Phân Bổ Tiêu Thụ Năng Lượng Chi Tiết (Thermal vs Electrical):
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      Nhiệt Năng Tái Sinh (Thermal)
                    </span>
                    <span className="text-xl font-bold font-mono text-amber-400 block mt-1">
                      {simResult.specificThermalEnergyGjTon} GJ / tấn
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ({simResult.specificThermalEnergyKwhTon} kWh-th / tấn)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      Điện Năng Quạt & Bơm (Electric)
                    </span>
                    <span className="text-xl font-bold font-mono text-cyan-400 block mt-1">
                      {simResult.specificElectricalEnergyKwhTon} kWh / tấn
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      (Quạt hút + Bơm chân không)
                    </span>
                  </div>
                </div>

                {/* Energy Bar Comparison */}
                <div className="mt-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs text-slate-300 font-semibold block mb-2">
                    Tỷ Trọng Năng Lượng Trong 1 Tấn CO₂ Thu Được:
                  </span>
                  <div className="w-full h-6 bg-slate-800 rounded-lg overflow-hidden flex">
                    <div
                      className="h-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-slate-950"
                      style={{ width: `${(simResult.specificThermalEnergyKwhTon / simResult.totalEnergyKwhTon) * 100}%` }}
                    >
                      Nhiệt {((simResult.specificThermalEnergyKwhTon / simResult.totalEnergyKwhTon) * 100).toFixed(0)}%
                    </div>
                    <div
                      className="h-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-slate-950"
                      style={{ width: `${(simResult.specificElectricalEnergyKwhTon / simResult.totalEnergyKwhTon) * 100}%` }}
                    >
                      Điện {((simResult.specificElectricalEnergyKwhTon / simResult.totalEnergyKwhTon) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-2">
                    <span>Tổng Năng Lượng: <strong className="text-white">{simResult.totalEnergyKwhTon} kWh/tấn</strong></span>
                    <span>Cân Bằng Nước: <strong className={simResult.waterConsumptionM3Ton > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      {simResult.waterConsumptionM3Ton > 0 ? `+${simResult.waterConsumptionM3Ton} m³ hao hụt` : `${simResult.waterConsumptionM3Ton} m³ thu hồi`}
                    </strong></span>
                  </div>
                </div>
              </div>

              {/* Sherwood Plot Context Notice */}
              <div className="mt-4 p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300/90 leading-relaxed">
                <span className="font-bold flex items-center gap-1.5 text-cyan-200 mb-0.5">
                  <Info className="w-3.5 h-3.5" />
                  Định Luật Phân Tách Khí Của Sherwood:
                </span>
                Chi phí và công phân tách tăng theo hàm logarit nghịch đảo tỉ lệ thuận với độ loãng của chất khí. Việc tách CO₂ từ không khí (420 ppm) khó hơn gấp nhiều lần so với thu giữ tại nhà máy nhiệt điện than (120,000 ppm), đòi hỏi phải tận dụng tối đa nguồn nhiệt thừa chi phí thấp để đạt hiệu quả thương mại.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NET ZERO ECONOMICS AND PTX */}
        {activeTab === 'NET_ZERO_ECONOMICS_AND_PTX' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cost Breakdown & Sliders */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Cơ Cấu Giá Năng Lượng & Nhiệt Nguồn:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lựa chọn nguồn cấp nhiệt tái sinh sorbent và giá điện năng lượng tái tạo
                </p>
              </div>

              {/* Heat Source Radio Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['GEOTHERMAL', 'INDUSTRIAL_WASTE_HEAT', 'SOLAR_THERMAL', 'OXY_METHANE_CALCINER'] as DacHeatSource[]).map(source => (
                  <button
                    key={source}
                    onClick={() => handleHeatSourceChange(source)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      selectedHeatSource === source
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-[11px]">
                      {source === 'GEOTHERMAL' && 'Địa Nhiệt 100°C'}
                      {source === 'INDUSTRIAL_WASTE_HEAT' && 'Nhiệt Thải Công Nghiệp'}
                      {source === 'SOLAR_THERMAL' && 'Năng Lượng Mặt Trời'}
                      {source === 'OXY_METHANE_CALCINER' && 'Lò Đốt Oxy-Gas'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Electricity Price Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Giá điện xanh:</span>
                  <span className="font-mono text-cyan-400 font-bold">${electricityPriceUsdKwh.toFixed(3)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.10"
                  step="0.005"
                  value={electricityPriceUsdKwh}
                  onChange={e => setElectricityPriceUsdKwh(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Thermal Price Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Đơn giá nhiệt cơ sở:</span>
                  <span className="font-mono text-amber-400 font-bold">${thermalEnergyPriceUsdGj.toFixed(1)} / GJ</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.5"
                  value={thermalEnergyPriceUsdGj}
                  onChange={e => setThermalEnergyPriceUsdGj(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Cost Stack Breakdown */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Cơ Cấu Giá Thành ($ / tấn CO₂):
                </span>
                <div className="flex justify-between text-slate-300">
                  <span>Khấu hao CAPEX thiết bị:</span>
                  <span className="text-slate-200 font-bold">${simResult.costBreakdown.capexAmortizedPerTon}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>OPEX Nhiệt năng:</span>
                  <span className="text-amber-400 font-bold">${simResult.costBreakdown.opexThermalPerTon}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>OPEX Điện quạt & bơm:</span>
                  <span className="text-cyan-400 font-bold">${simResult.costBreakdown.opexElectricityPerTon}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Vật liệu sorbent & hóa chất:</span>
                  <span className="text-slate-200 font-bold">${simResult.costBreakdown.opexSorbentReagentPerTon}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Bảo trì & vận hành:</span>
                  <span className="text-slate-200 font-bold">${simResult.costBreakdown.opexMaintenancePerTon}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm">
                  <span>Tổng Giá Thành (LCOE-DAC):</span>
                  <span className="text-emerald-400">${simResult.costBreakdown.totalCostPerTonCo2} / tấn</span>
                </div>
              </div>
            </div>

            {/* Power-to-X Coupling & Aviation e-Fuel Dashboard */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Tích Hợp Chuỗi Cung Ứng Power-to-X (SOEC & AEMWE e-Fuel Coupling):
                </span>
                <p className="text-xs text-slate-400 mb-4">
                  Dòng CO₂ thu hồi từ DAC được cấp trực tiếp vào bình điện phân SOEC hoặc hydro hóa tạo xăng máy bay e-Kerosene trung hòa carbon 100%.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Sản lượng khí CO:</span>
                    <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">
                      {simResult.couplingPtX.syngasCoOutputNm3H} Nm³/h
                    </span>
                    <span className="text-[10px] text-slate-500">(Khí tổng hợp Syngas)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Nhu cầu Hydro Xanh:</span>
                    <span className="text-lg font-bold font-mono text-emerald-400 mt-1 block">
                      {simResult.couplingPtX.greenH2RequiredKgH} kg/h
                    </span>
                    <span className="text-[10px] text-slate-500">(Cấp từ AEMWE / PEM)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Nhiên liệu e-Kerosene:</span>
                    <span className="text-lg font-bold font-mono text-amber-400 mt-1 block">
                      {simResult.couplingPtX.eKeroseneProductionLitersDay} L/ngày
                    </span>
                    <span className="text-[10px] text-slate-500">(Xăng hàng không Net-Zero)</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Vòng Tuần Hoàn Carbon Đóng Kín Hoàn Toàn (Net-Zero Aviation):
                  </span>
                  <p className="text-xs text-emerald-400/90 leading-relaxed font-mono">
                    Khí thải động cơ máy bay chứa CO₂ → DAC lọc từ khí quyển → Điện phân SOEC tạo Syngas → Fischer-Tropsch tổng hợp e-Kerosene → Tiếp tục bay mà không làm tăng bất kỳ một ppm CO₂ nào trong khí quyển Trái Đất.
                  </p>
                </div>
              </div>

              {/* Mineralization Alternative */}
              <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-200 block mb-1">
                  Phương Án 2: Khoáng Hóa Đất Đá Vĩnh Cửu (CarbFix Basalt Mineralization):
                </span>
                Hòa tan CO₂ thu giữ vào nước ngầm và bơm sâu 1,000m vào các tầng đá bazan núi lửa ngầm. Trong vòng 2 năm, CO₂ phản ứng hoàn toàn với các cation Mg²⁺ và Ca²⁺ trong đá để hóa thạch vĩnh cửu thành đá vôi, loại bỏ khí nhà kính vĩnh viễn suốt hơn 10,000 năm mà không lo rò rỉ.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DirectAirCaptureVisualizer;
