// src/components/visualizations/CuClThermochemicalVisualizer.tsx
// Interactive Visualizer: Copper-Chlorine (Cu-Cl) Thermochemical Water-Splitting Engine
// Conforms to: GIF Taskforce Standards, AECL / Ontario Tech Benchmarks & Vietnam GDPT 2018 Chemistry & Physics

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Sparkles,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Car,
  Leaf,
  Sliders,
  BarChart3,
  RefreshCw,
  Gauge,
  Factory,
  ArrowRight,
  Sun,
  ShieldCheck
} from 'lucide-react';
import {
  CuClCycleStepId,
  HeatSourceCouplingType,
  CU_CL_CYCLE_STEPS,
  HEAT_SOURCE_CATALOG,
  calculateCuClCellVoltage,
  calculateCuClHydrogenProduction,
  HYDROGEN_PROCESS_BENCHMARKS,
  CU_CL_MAX_CYCLE_TEMP_C
} from '../../domain/cuClThermochemicalEngine';
import { sound } from '../../audio/soundEngine';

type CuClTabMode =
  | 'CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP'
  | 'NUCLEAR_SOLAR_HEAT_COUPLING_SIMULATOR'
  | 'ELECTROCHEMICAL_OVERPOTENTIAL_AND_CYCLE_BENCHMARKS';

export const CuClThermochemicalVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CuClTabMode>('CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP');

  // Mode 1 state: Inspected cycle step
  const [inspectedStepId, setInspectedStepId] = useState<CuClCycleStepId>('STEP_1_HYDROLYSIS');

  // Mode 2 state: Heat source coupling & hydrogen yield
  const [heatSourceId, setHeatSourceId] = useState<HeatSourceCouplingType>('MSR_MOLTEN_SALT_700C');
  const [thermalInputMwTh, setThermalInputMwTh] = useState<number>(200);
  const [cellVoltageInputV, setCellVoltageInputV] = useState<number>(0.65);

  // Mode 3 state: Electrolysis cell overpotential kinetics
  const [currentDensityMAcm2, setCurrentDensityMAcm2] = useState<number>(300);
  const [cellTempC, setCellTempC] = useState<number>(85);

  const inspectedStep = useMemo(() => {
    return CU_CL_CYCLE_STEPS[inspectedStepId] || CU_CL_CYCLE_STEPS.STEP_1_HYDROLYSIS;
  }, [inspectedStepId]);

  const selectedHeatSource = useMemo(() => {
    return HEAT_SOURCE_CATALOG[heatSourceId] || HEAT_SOURCE_CATALOG.MSR_MOLTEN_SALT_700C;
  }, [heatSourceId]);

  const handleModeSwitch = (mode: CuClTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleStepSelect = (stepId: CuClCycleStepId) => {
    sound.playUiClick();
    setInspectedStepId(stepId);
  };

  const handleHeatSourceSelect = (srcId: HeatSourceCouplingType) => {
    sound.playUiClick();
    setHeatSourceId(srcId);
  };

  // Calculations for Mode 2
  const yieldResult = useMemo(() => {
    return calculateCuClHydrogenProduction(thermalInputMwTh, heatSourceId, cellVoltageInputV);
  }, [thermalInputMwTh, heatSourceId, cellVoltageInputV]);

  // Calculations for Mode 3
  const cellKinetics = useMemo(() => {
    return calculateCuClCellVoltage(currentDensityMAcm2, cellTempC);
  }, [currentDensityMAcm2, cellTempC]);

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                Chu Trình Nhiệt Hóa Đồng - Clo (Cu-Cl Water-Splitting Cycle)
              </h2>
              <p className="text-xs text-slate-400">
                Chia tách nước bằng nhiệt hạt nhân MSR / nhiệt mặt trời CSP ở 530°C • Tiết kiệm &gt;65% điện năng so với PEM
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeSwitch('CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP'
                ? 'bg-amber-600/30 border border-amber-500 text-amber-300 shadow-md shadow-amber-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Vòng Tuần Hoàn 4 Bước (530°C)
          </button>
          <button
            onClick={() => handleModeSwitch('NUCLEAR_SOLAR_HEAT_COUPLING_SIMULATOR')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'NUCLEAR_SOLAR_HEAT_COUPLING_SIMULATOR'
                ? 'bg-rose-600/30 border border-rose-500 text-rose-300 shadow-md shadow-rose-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Ghép Nối MSR & Năng Lượng H₂
          </button>
          <button
            onClick={() => handleModeSwitch('ELECTROCHEMICAL_OVERPOTENTIAL_AND_CYCLE_BENCHMARKS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'ELECTROCHEMICAL_OVERPOTENTIAL_AND_CYCLE_BENCHMARKS'
                ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Quá Thế Điện Cực & So Sánh Chu Trình
          </button>
        </div>
      </div>

      {/* MODE 1: CU-CL FLOWSHEET & CHEMICAL LOOP */}
      {activeMode === 'CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP' && (
        <div className="space-y-6">
          {/* Step Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(CU_CL_CYCLE_STEPS) as CuClCycleStepId[]).map(sKey => {
              const s = CU_CL_CYCLE_STEPS[sKey];
              const isSelected = inspectedStepId === sKey;
              return (
                <button
                  key={sKey}
                  onClick={() => handleStepSelect(sKey)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-md shadow-amber-950/30'
                      : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-400">{s.name.split(':')[0]}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        s.temperatureC >= 500
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-slate-900 text-slate-300'
                      }`}>
                        {s.temperatureC}°C
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 mt-1 line-clamp-1">
                      {s.name.split(':')[1]?.trim() || s.name}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-2 bg-slate-900/60 p-1.5 rounded border border-slate-800 line-clamp-1">
                    {s.chemicalEquation}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Closed-Loop SVG Diagram */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 px-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                Vòng Tuần Hoàn Khép Kín 4 Phản Ứng: Không Tiêu Hao Đồng (Cu) & Clo (Cl)
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Nhiệt độ đỉnh chu trình: {CU_CL_MAX_CYCLE_TEMP_C}°C (Bước 2)
              </span>
            </div>

            <div className="relative overflow-x-auto">
              <svg viewBox="0 0 840 320" className="w-full h-80 select-none">
                <defs>
                  <linearGradient id="step1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="step2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="step3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="step4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Central Closed Loop Circular Arrow */}
                <circle cx="420" cy="160" r="110" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6,6" />
                <text x="420" y="155" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="black">
                  TUẦN HOÀN 100% Cu & Cl
                </text>
                <text x="420" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Phản ứng ròng: H₂O → H₂ + ½ O₂
                </text>

                {/* STEP 1: Hydrolyzer (Top Left) */}
                <g transform="translate(100, 20)">
                  <rect x="0" y="0" width="220" height="90" fill="url(#step1Grad)" stroke="#f59e0b" strokeWidth={inspectedStepId === 'STEP_1_HYDROLYSIS' ? 3 : 1.5} rx="8" />
                  <text x="110" y="24" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">
                    Bước 1: Thủy Phân (390°C)
                  </text>
                  <text x="110" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="semibold">
                    2 CuCl₂ + H₂O → Cu₂OCl₂ + 2 HCl
                  </text>
                  <rect x="15" y="56" width="190" height="22" fill="#0f172a" rx="4" />
                  <text x="110" y="71" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                    Lò tầng sôi • Hastelloy C-276
                  </text>
                  {/* Water Input Arrow */}
                  <line x1="-50" y1="45" x2="0" y2="45" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="-25" y="38" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    + H₂O (g)
                  </text>
                </g>

                {/* STEP 2: Decomposition (Top Right) */}
                <g transform="translate(520, 20)">
                  <rect x="0" y="0" width="220" height="90" fill="url(#step2Grad)" stroke="#ef4444" strokeWidth={inspectedStepId === 'STEP_2_DECOMPOSITION' ? 3 : 1.5} rx="8" />
                  <text x="110" y="24" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">
                    Bước 2: Nhiệt Phân (530°C Đỉnh)
                  </text>
                  <text x="110" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="semibold">
                    Cu₂OCl₂ → 2 CuCl (l) + ½ O₂ ↑
                  </text>
                  <rect x="15" y="56" width="190" height="22" fill="#450a0a" rx="4" />
                  <text x="110" y="71" fill="#fca5a5" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Nhiệt hạt nhân MSR / CSP cung cấp
                  </text>
                  {/* Oxygen Output Arrow */}
                  <line x1="220" y1="45" x2="270" y2="45" stroke="#f43f5e" strokeWidth="3" />
                  <text x="245" y="38" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold">
                    ½ O₂ ↑
                  </text>
                </g>

                {/* STEP 3: Electrochemical Cell (Bottom Right) */}
                <g transform="translate(520, 200)">
                  <rect x="0" y="0" width="220" height="90" fill="url(#step3Grad)" stroke="#06b6d4" strokeWidth={inspectedStepId === 'STEP_3_ELECTROLYSIS' ? 3 : 1.5} rx="8" />
                  <text x="110" y="24" fill="#67e8f9" fontSize="12" textAnchor="middle" fontWeight="bold">
                    Bước 3: Điện Phân Lai Ghép (85°C)
                  </text>
                  <text x="110" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="semibold">
                    2 CuCl + 2 HCl → 2 CuCl₂ + H₂ ↑
                  </text>
                  <rect x="15" y="56" width="190" height="22" fill="#082f49" rx="4" />
                  <text x="110" y="71" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                    E_cell = 0.65 V (Chỉ 1/3 điện áp nước!)
                  </text>
                  {/* Hydrogen Output Arrow */}
                  <line x1="220" y1="45" x2="270" y2="45" stroke="#4ade80" strokeWidth="3" />
                  <text x="245" y="38" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">
                    H₂ (g) ↑
                  </text>
                </g>

                {/* STEP 4: Crystallizer (Bottom Left) */}
                <g transform="translate(100, 200)">
                  <rect x="0" y="0" width="220" height="90" fill="url(#step4Grad)" stroke="#10b981" strokeWidth={inspectedStepId === 'STEP_4_CRYSTALLIZATION' ? 3 : 1.5} rx="8" />
                  <text x="110" y="24" fill="#6ee7b7" fontSize="12" textAnchor="middle" fontWeight="bold">
                    Bước 4: Kết Tinh Tái Sinh (120°C)
                  </text>
                  <text x="110" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="semibold">
                    CuCl₂ (aq) → CuCl₂ (s) + H₂O (g)
                  </text>
                  <rect x="15" y="56" width="190" height="22" fill="#022c22" rx="4" />
                  <text x="110" y="71" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                    Tận dụng nhiệt thải thứ cấp nội bộ
                  </text>
                </g>

                {/* Connecting Chemical Transport Lines */}
                {/* Step 1 to Step 2: Cu2OCl2 */}
                <path d="M 320 50 L 520 50" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <text x="420" y="42" fill="#fde68a" fontSize="9" textAnchor="middle">
                  Cu₂OCl₂ (s)
                </text>

                {/* Step 2 to Step 3: CuCl */}
                <path d="M 630 110 L 630 200" fill="none" stroke="#ef4444" strokeWidth="3" />
                <text x="645" y="155" fill="#fca5a5" fontSize="9" textAnchor="start">
                  CuCl (l) nóng chảy
                </text>

                {/* Step 1 to Step 3: HCl transport */}
                <path d="M 210 110 L 210 160 L 550 160 L 550 200" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                <text x="380" y="155" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                  2 HCl (g) sang cực âm
                </text>

                {/* Step 3 to Step 4: CuCl2 (aq) */}
                <path d="M 520 245 L 320 245" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <text x="420" y="238" fill="#bae6fd" fontSize="9" textAnchor="middle">
                  CuCl₂ dung dịch
                </text>

                {/* Step 4 to Step 1: CuCl2 (s) crystals recycled */}
                <path d="M 170 200 L 170 110" fill="none" stroke="#10b981" strokeWidth="3" />
                <text x="155" y="155" fill="#a7f3d0" fontSize="9" textAnchor="end">
                  CuCl₂ (s) tinh thể
                </text>
              </svg>
            </div>

            {/* Step Details Deep-Dive Card */}
            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-700/60 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-amber-300">{inspectedStep.name}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-700">
                  Nhiệt độ: {inspectedStep.temperatureC}°C | Áp suất: {inspectedStep.pressureBar} bar
                </span>
              </div>
              <p className="text-slate-300">{inspectedStep.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400">Trạng thái pha:</span>{' '}
                  <span className="text-slate-200">{inspectedStep.physicalStates}</span>
                </div>
                <div>
                  <span className="text-slate-400">Vật liệu chống ăn mòn:</span>{' '}
                  <span className="text-amber-400 font-semibold">{inspectedStep.corrosionResistantMaterial}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: NUCLEAR & SOLAR HEAT COUPLING */}
      {activeMode === 'NUCLEAR_SOLAR_HEAT_COUPLING_SIMULATOR' && (
        <div className="space-y-6">
          {/* Controls: Heat source, MWth, Cell Voltage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            {/* Heat Source Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Nguồn Cung Cấp Nhiệt Cao:
              </label>
              <div className="space-y-1.5">
                {(Object.keys(HEAT_SOURCE_CATALOG) as HeatSourceCouplingType[]).map(srcKey => {
                  const src = HEAT_SOURCE_CATALOG[srcKey];
                  const isSelected = heatSourceId === srcKey;
                  return (
                    <button
                      key={srcKey}
                      onClick={() => handleHeatSourceSelect(srcKey)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                          : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-[12px]">{src.name.split('(')[0].trim()}</div>
                      <div className="text-[10px] text-slate-400 flex justify-between mt-0.5">
                        <span>Đầu ra: <b className="text-rose-400">{src.coreOutletTempC}°C</b></span>
                        <span className="text-emerald-400 font-semibold">+{src.thermalSafetyMarginToCycleMaxC}°C margin</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thermal Power Slider */}
            <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Công Suất Nhiệt (MWth):</span>
                  <span className="text-rose-400 font-bold">{thermalInputMwTh} MWth</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={thermalInputMwTh}
                  onChange={e => {
                    sound.playUiClick();
                    setThermalInputMwTh(parseFloat(e.target.value));
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between mt-1">
                  <span>50 MWth (SMR nhỏ)</span>
                  <span>1,000 MWth (Nhà máy lớn)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                Hiệu suất nhiệt hóa LHV: <b className="text-emerald-400">{yieldResult.lhvThermalEfficiencyPct}%</b>
                <span className="text-slate-500 block text-[10px]">HHV: {yieldResult.hhvThermalEfficiencyPct}%</span>
              </div>
            </div>

            {/* Cell Voltage Slider */}
            <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Điện Áp Cực Bước 3:</span>
                  <span className="text-cyan-400 font-bold">{cellVoltageInputV.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="0.45"
                  max="0.85"
                  step="0.02"
                  value={cellVoltageInputV}
                  onChange={e => {
                    sound.playUiClick();
                    setCellVoltageInputV(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between mt-1">
                  <span>0.45 V (Lab lý tưởng)</span>
                  <span>0.85 V (Dòng cực cao)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                Điện năng tiêu thụ: <b className="text-cyan-300">{yieldResult.electricityConsumptionKwhPerKgH2} kWh/kg</b>
                <span className="text-emerald-400 block text-[10px] font-semibold">
                  Tiết kiệm {yieldResult.electricitySavedVsPemPct}% điện so với PEM!
                </span>
              </div>
            </div>
          </div>

          {/* Hydrogen Output Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Sản Lượng Hydro H₂</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {yieldResult.hydrogenDailyMetricTons.toLocaleString()} <span className="text-sm font-normal text-emerald-400">tấn/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Tốc độ sản xuất: <span className="text-slate-200 font-semibold">{yieldResult.hydrogenHourlyKg.toLocaleString()} kg/giờ</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Khí Oxy O₂ Đồng Sinh</span>
                <Droplets className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {yieldResult.oxygenDailyMetricTons.toLocaleString()} <span className="text-sm font-normal text-cyan-400">tấn/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Tỷ lệ khối lượng 8:1 cho y tế và luyện kim xanh
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Tiết Kiệm Điện Năng</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">
                {yieldResult.electricitySavedVsPemPct}% <span className="text-sm font-normal text-amber-400">ít điện hơn</span>
              </div>
              <div className="text-xs text-slate-400">
                Chỉ <span className="text-amber-200 font-semibold">{yieldResult.electricityConsumptionKwhPerKgH2} kWh/kg</span> (PEM cần 52 kWh/kg)
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Cắt Giảm CO₂ Hóa Thạch</span>
                <Leaf className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-black text-green-300">
                {yieldResult.fossilCo2AvoidedDailyTons.toLocaleString()} <span className="text-sm font-normal text-green-400">tấn/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                So với khí hóa than/metan SMR (10.5 tấn CO₂/tấn H₂)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: ELECTROCHEMICAL OVERPOTENTIAL & BENCHMARKS */}
      {activeMode === 'ELECTROCHEMICAL_OVERPOTENTIAL_AND_CYCLE_BENCHMARKS' && (
        <div className="space-y-6">
          {/* Overpotential Kinetics Simulator */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              Mô Phỏng Động Học Phân Cực Điện Hóa Bước 3 (E_cell = E° + η_anode + η_cathode + i·R)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Mật độ dòng điện (i):</span>
                  <span className="text-cyan-400 font-bold">{currentDensityMAcm2} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="25"
                  value={currentDensityMAcm2}
                  onChange={e => {
                    sound.playUiClick();
                    setCurrentDensityMAcm2(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nhiệt độ dung dịch điện phân:</span>
                  <span className="text-amber-400 font-bold">{cellTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={cellTempC}
                  onChange={e => {
                    sound.playUiClick();
                    setCellTempC(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Overpotential Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Thế cân bằng E°:</span>
                <span className="font-bold text-slate-200 text-sm">{cellKinetics.standardPotentialVolts} V</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Quá thế Anot Cu(I)→Cu(II):</span>
                <span className="font-bold text-amber-400 text-sm">+{cellKinetics.anodicOverpotentialV} V</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Quá thế Catot 2H⁺→H₂:</span>
                <span className="font-bold text-emerald-400 text-sm">+{cellKinetics.cathodicOverpotentialV} V</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Sụt áp màng Ohmic i·R:</span>
                <span className="font-bold text-rose-400 text-sm">+{cellKinetics.ohmicDropV} V</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-cyan-950/50 p-1.5 rounded border border-cyan-800">
                <span className="text-cyan-300 block text-[10px] font-bold">Tổng Điện Áp Cell:</span>
                <span className="font-black text-cyan-300 text-base">{cellKinetics.cellVoltageVolts} V</span>
              </div>
            </div>
          </div>

          {/* Process Benchmarks Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              So Sánh Kỹ Thuật 4 Công Nghệ Sản Xuất Hydro Công Nghiệp
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {HYDROGEN_PROCESS_BENCHMARKS.map(bench => (
                <div
                  key={bench.processName}
                  className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm text-amber-300">{bench.processName}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-900 border border-slate-700 text-slate-300">
                        TRL {bench.commercialReadinessLevelTrl}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Nhiệt độ đỉnh:</span>
                        <span className="font-bold text-rose-400">{bench.maxTemperatureC}°C</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hiệu suất LHV:</span>
                        <span className="font-bold text-emerald-400">{bench.overallEfficiencyLhvPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Điện năng tiêu thụ:</span>
                        <span className="font-bold text-cyan-400">{bench.electricInputKwhPerKgH2} kWh/kg</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <span className="text-slate-400 font-semibold">Khả năng ghép nối hạt nhân:</span>{' '}
                      {bench.nuclearCouplingCapability}
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-semibold text-emerald-400">Ưu điểm nổi bật:</div>
                      <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                        {bench.advantages.map((adv, idx) => (
                          <li key={idx} className="leading-tight">{adv}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 border-t border-slate-700/50 pt-2 italic">
                    Thách thức chính: {bench.bottlenecks.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
