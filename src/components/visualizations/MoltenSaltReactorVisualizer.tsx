// src/components/visualizations/MoltenSaltReactorVisualizer.tsx
// Interactive Visualizer: Molten Salt Nuclear Reactor (MSR) & Thorium Fuel Cycle
// Conforms to: IUPAC Physical Chemistry, ORNL MSRE Benchmarks & GIF Generation-IV Standards

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Droplets,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Atom,
  Cpu,
  Layers,
  ThermometerSun,
  Radio,
  Timer
} from 'lucide-react';
import {
  MoltenSaltType,
  PowerConversionCycle,
  MsrReactorParameters,
  MOLTEN_SALT_CATALOG,
  calculateMsrPerformance
} from '../../domain/moltenSaltReactorEngine';
import { sound } from '../../audio/soundEngine';

type MsrTabMode =
  | 'CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY'
  | 'PASSIVE_FREEZE_PLUG_SAFETY_SIMULATION'
  | 'THORIUM_BREEDING_AND_WASTE_HORIZON';

export const MoltenSaltReactorVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MsrTabMode>('CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY');
  const [selectedFuelSalt, setSelectedFuelSalt] = useState<MoltenSaltType>('THORIUM_FLUORIDE_FUEL');
  const [selectedPowerCycle, setSelectedPowerCycle] = useState<PowerConversionCycle>('SUPERCRITICAL_CO2_BRAYTON');

  // Sliders
  const [thermalPowerMwTh, setThermalPowerMwTh] = useState<number>(500);
  const [coreOutletTemperatureC, setCoreOutletTemperatureC] = useState<number>(720);
  const [heliumSpargingFlowM3PerH, setHeliumSpargingFlowM3PerH] = useState<number>(15.0);
  const [bismuthExtractionRateKgPerH, setBismuthExtractionRateKgPerH] = useState<number>(180.0);
  const [freezePlugActiveCoolingKw, setFreezePlugActiveCoolingKw] = useState<number>(15.0);

  // SBO Emergency Simulation State
  const [isStationBlackoutActive, setIsStationBlackoutActive] = useState<boolean>(false);

  // Calculate MSR simulation
  const result = useMemo(() => {
    const params: MsrReactorParameters = {
      fuelSaltType: selectedFuelSalt,
      coolantSaltType: 'FLINAK_LI_NA_KF',
      thermalPowerMwTh,
      coreInletTemperatureC: Math.max(500, coreOutletTemperatureC - 100),
      coreOutletTemperatureC,
      powerCycle: selectedPowerCycle,
      heliumSpargingFlowM3PerH,
      bismuthExtractionRateKgPerH,
      freezePlugActiveCoolingKw: isStationBlackoutActive ? 0.0 : freezePlugActiveCoolingKw
    };
    return calculateMsrPerformance(params);
  }, [
    selectedFuelSalt,
    selectedPowerCycle,
    thermalPowerMwTh,
    coreOutletTemperatureC,
    heliumSpargingFlowM3PerH,
    bismuthExtractionRateKgPerH,
    freezePlugActiveCoolingKw,
    isStationBlackoutActive
  ]);

  const toggleStationBlackout = () => {
    sound.playUiClick();
    setIsStationBlackoutActive(prev => !prev);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-orange-950 to-slate-950 border border-amber-800/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Atom className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Generation-IV Liquid Fluoride Thorium Reactor (LFTR) Engine</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
              Lò Phản Ứng Hạt Nhân Muối Lỏng & Chu Trình Nhiên Liệu Thori
            </h2>
            <p className="text-amber-200/80 text-sm mt-1 max-w-3xl leading-relaxed">
              Vận hành ở áp suất khí quyển (&lt; 2 bar) với nhiên liệu muối lỏng nóng chảy (FLiBe ThF₄/UF₄), an toàn thụ động tuyệt đối
              với thành phao đóng băng (freeze plug), chu trình tái sinh Thori ²³²Th → ²³³U và tuabin khí CO₂ siêu tới hạn (sCO₂) hiệu suất 50%.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-amber-900/60 border border-amber-500/40 rounded-lg text-amber-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
              <span>Core: {coreOutletTemperatureC}°C</span>
            </span>
            <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>P_elec: {result.powerCyclePerformance.electricPowerOutputMw} MWe</span>
            </span>
            <span className="px-3 py-1 bg-blue-900/60 border border-blue-500/40 rounded-lg text-blue-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>P: ~1.5 bar (Khí quyển)</span>
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-amber-900/50">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY'
                ? 'bg-amber-500 text-obsidian shadow-lg shadow-amber-500/30 font-extrabold ring-2 ring-amber-300'
                : 'bg-obsidian/40 text-amber-200/80 hover:bg-amber-950/60 hover:text-white border border-amber-800/40'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>1. Sơ Đồ Vùng Hoạt & Hóa Học Tái Sinh Trực Tuyến</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('PASSIVE_FREEZE_PLUG_SAFETY_SIMULATION');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PASSIVE_FREEZE_PLUG_SAFETY_SIMULATION'
                ? 'bg-amber-500 text-obsidian shadow-lg shadow-amber-500/30 font-extrabold ring-2 ring-amber-300'
                : 'bg-obsidian/40 text-amber-200/80 hover:bg-amber-950/60 hover:text-white border border-amber-800/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>2. Mô Phỏng An Toàn Thành Phao Đóng Băng (SBO Freeze Plug)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('THORIUM_BREEDING_AND_WASTE_HORIZON');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'THORIUM_BREEDING_AND_WASTE_HORIZON'
                ? 'bg-amber-500 text-obsidian shadow-lg shadow-amber-500/30 font-extrabold ring-2 ring-amber-300'
                : 'bg-obsidian/40 text-amber-200/80 hover:bg-amber-950/60 hover:text-white border border-amber-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Tái Sinh Thori & Xóa Bỏ Rác Thải Transuranic 300 Năm</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CORE FLOWSHEET & ONLINE CHEMISTRY */}
      {activeTab === 'CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Controls Column */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Thông Số Lò Phản Ứng LFTR</span>
            </h3>

            {/* Fuel Salt Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Thành Phần Muối Nhiên Liệu (Fuel Salt):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFuelSalt('THORIUM_FLUORIDE_FUEL');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedFuelSalt === 'THORIUM_FLUORIDE_FUEL'
                      ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Muối Tái Sinh Thori (FLiBe-ThF₄)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFuelSalt('FLIBE_LI2BEF4');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedFuelSalt === 'FLIBE_LI2BEF4'
                      ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  FLiBe Chuẩn ORNL (LiF-BeF₂)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFuelSalt('FLINAK_LI_NA_KF');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedFuelSalt === 'FLINAK_LI_NA_KF'
                      ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  FLiNaK Ba Cấu Tử (Không Beryli)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFuelSalt('CHLORIDE_NACL_MGCL2');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedFuelSalt === 'CHLORIDE_NACL_MGCL2'
                      ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Muối Clorua Phổ Nhanh (MCFR)
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Công Suất Nhiệt Vùng Hoạt:</span>
                  <span className="font-mono text-amber-400 font-bold">{thermalPowerMwTh} MWth</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="25"
                  value={thermalPowerMwTh}
                  onChange={e => setThermalPowerMwTh(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Nhiệt Độ Muối Ra Vùng Hoạt (T_out):</span>
                  <span className="font-mono text-amber-400 font-bold">{coreOutletTemperatureC} °C</span>
                </div>
                <input
                  type="range"
                  min="650"
                  max="780"
                  step="5"
                  value={coreOutletTemperatureC}
                  onChange={e => setCoreOutletTemperatureC(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Lưu Lượng Sục Khí Heli (Xe-135 Stripping):</span>
                  <span className="font-mono text-cyan-400 font-bold">{heliumSpargingFlowM3PerH} m³/h</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={heliumSpargingFlowM3PerH}
                  onChange={e => setHeliumSpargingFlowM3PerH(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Tốc Độ Chiết Bismuth (Pa-233 Isolation):</span>
                  <span className="font-mono text-emerald-400 font-bold">{bismuthExtractionRateKgPerH} kg/h</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={bismuthExtractionRateKgPerH}
                  onChange={e => setBismuthExtractionRateKgPerH(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Selected Salt Card */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Info className="w-3.5 h-3.5" />
                <span>{MOLTEN_SALT_CATALOG[selectedFuelSalt].name}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {MOLTEN_SALT_CATALOG[selectedFuelSalt].description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-slate-300">
                <div>Độ Sôi: <span className="text-amber-400">{MOLTEN_SALT_CATALOG[selectedFuelSalt].boilingPointC}°C</span></div>
                <div>Khối Lượng Riêng: <span className="text-cyan-400">{MOLTEN_SALT_CATALOG[selectedFuelSalt].densityGPerCm3At700C} g/cm³</span></div>
              </div>
            </div>
          </div>

          {/* Center Column: Animated Core Flowsheet SVG */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Sơ Đồ Vùng Hoạt & Bộ Tuần Hoàn Trực Tuyến</span>
              </h3>

              {/* Interactive SVG Diagram */}
              <div className="mt-4 bg-slate-950/90 border border-amber-950 rounded-xl p-4 flex items-center justify-center">
                <svg viewBox="0 0 460 320" className="w-full max-w-md h-auto font-sans">
                  <defs>
                    <linearGradient id="fuelSaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="freezePlugGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>

                  {/* Reactor Core Vessel */}
                  <rect x="50" y="40" width="130" height="180" rx="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                  <rect x="60" y="50" width="110" height="160" rx="12" fill="url(#fuelSaltGrad)" />

                  {/* Graphite Moderator Hexagonal Channels */}
                  <line x1="85" y1="60" x2="85" y2="195" stroke="#334155" strokeWidth="6" strokeDasharray="12 4" />
                  <line x1="115" y1="60" x2="115" y2="195" stroke="#334155" strokeWidth="6" strokeDasharray="12 4" />
                  <line x1="145" y1="60" x2="145" y2="195" stroke="#334155" strokeWidth="6" strokeDasharray="12 4" />

                  <text x="115" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">VÙNG HOẠT (CORE)</text>
                  <text x="115" y="100" fill="#fef08a" fontSize="12" fontWeight="black" textAnchor="middle">
                    {coreOutletTemperatureC}°C
                  </text>
                  <text x="115" y="115" fill="#fde047" fontSize="8" textAnchor="middle">Áp suất: 1.5 bar (Khí quyển)</text>

                  {/* Online Helium Sparging Bubble Column */}
                  <rect x="220" y="25" width="65" height="85" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="252" y="42" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Sục Heli Khí</text>
                  <text x="252" y="55" fill="#7dd3fc" fontSize="7" textAnchor="middle">Thoát Xe-135</text>
                  <text x="252" y="70" fill="#e0f2fe" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {result.neutronicsAndBreeding.xenon135PoisoningReductionPct}%
                  </text>
                  <circle cx="240" cy="85" r="3" fill="#38bdf8" />
                  <circle cx="255" cy="92" r="2.5" fill="#38bdf8" />
                  <circle cx="265" cy="82" r="2" fill="#38bdf8" />

                  {/* Connecting pipe: Core to Sparger */}
                  <path d="M 180 70 L 220 70" stroke="#f59e0b" strokeWidth="3" />

                  {/* Primary Heat Exchanger (PHX) */}
                  <rect x="220" y="130" width="75" height="95" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="257" y="152" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">Trao Đổi Nhiệt</text>
                  <text x="257" y="165" fill="#94a3b8" fontSize="7" textAnchor="middle">Primary HEX</text>
                  <text x="257" y="180" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">FLiNaK 680°C</text>

                  {/* Connecting pipe: Core to PHX */}
                  <path d="M 180 170 L 220 170" stroke="#f59e0b" strokeWidth="4" />

                  {/* Secondary loop to sCO2 Turbine */}
                  <path d="M 295 170 L 350 170" stroke="#10b981" strokeWidth="3.5" />
                  <circle cx="380" cy="170" r="24" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="380" y="167" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">Tuabin sCO₂</text>
                  <text x="380" y="180" fill="#60a5fa" fontSize="9" fontWeight="black" textAnchor="middle">
                    +{result.powerCyclePerformance.electricPowerOutputMw}MWe
                  </text>

                  {/* FREEZE PLUG at the bottom of the reactor core */}
                  <rect
                    x="100"
                    y="220"
                    width="30"
                    height="18"
                    rx="3"
                    fill={isStationBlackoutActive ? '#f87171' : 'url(#freezePlugGrad)'}
                    stroke={isStationBlackoutActive ? '#ef4444' : '#38bdf8'}
                    strokeWidth="1.5"
                  />
                  <text x="115" y="232" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                    {isStationBlackoutActive ? 'ĐANG CHẢY' : 'ĐÓNG BĂNG'}
                  </text>

                  {/* Gravity Drain Pipeline */}
                  <path d="M 115 238 L 115 265" stroke="#94a3b8" strokeWidth="4" strokeDasharray="3 2" />

                  {/* Subterranean Subcritical Drain Tanks */}
                  <rect x="50" y="265" width="130" height="42" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                  <text x="115" y="282" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">BỂ XẢ TRỌNG LỰC DƯỚI LÒNG ĐẤT</text>
                  <text x="115" y="296" fill="#94a3b8" fontSize="7" textAnchor="middle">Hình học dưới tới hạn (Subcritical Geometry)</text>
                </svg>
              </div>
            </div>

            {/* Negative Reactivity Feedback Callout */}
            <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hệ Số Nhiệt Độ Phản Phục Âm Tính (Negative Alpha_T):</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hệ số phản ứng âm <span className="font-mono text-amber-300 font-bold">{result.neutronicsAndBreeding.temperatureCoefficientOfReactivityPcmPerC} pcm/°C</span>:
                khi nhiệt độ vượt định mức, chất lỏng muối nở vì nhiệt và đẩy hạt nhân phân hạch ra khỏi vùng hoạt, tự động dập tắt công suất trong vài mili-giây mà không cần thanh điều khiển!
              </p>
            </div>
          </div>

          {/* Right Column: Performance & Neutronics Metrics */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Hiệu Suất Phát Điện & Vật Lý Hạt Nhân</span>
            </h3>

            <div className="space-y-3">
              {/* Electric Power Output */}
              <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 flex justify-between items-center shadow-lg">
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Công Suất Điện Xuất Lưới:</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {result.powerCyclePerformance.electricPowerOutputMw} MWe
                  </div>
                  <div className="text-[11px] text-emerald-200/70 mt-0.5">
                    Hiệu suất nhiệt sCO₂: <span className="font-mono font-bold text-white">{result.powerCyclePerformance.grossThermalEfficiencyPct}%</span> (vượt xa 33% của lò LWR)
                  </div>
                </div>
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>

              {/* Breeding Ratio */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tỷ Số Tái Sinh Hạt Nhân (Breeding Ratio):</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    BR = {result.neutronicsAndBreeding.breedingRatio}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  BR &gt; 1.05 nghĩa là lò sản sinh ra lượng nhiên liệu ²³³U nhiều hơn lượng tiêu thụ, biến Thori ²³²Th tự nhiên thành nguồn năng lượng vô tận!
                </div>
              </div>

              {/* Safety Margin */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nhiệt Độ Sôi Của Muối:</span>
                  <span className="font-mono text-slate-200">{MOLTEN_SALT_CATALOG[selectedFuelSalt].boilingPointC}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khoảng Cách An Toàn Đến Điểm Sôi:</span>
                  <span className="font-mono text-emerald-400 font-bold">+{result.safetyMarginToBoilingC}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Áp Suất Vận Hành:</span>
                  <span className="font-mono text-cyan-300">{result.operatingPressureBar} bar (Không nổ hơi)</span>
                </div>
              </div>

              {/* Co-generation High Temp Heat */}
              <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-3 flex justify-between items-center text-xs">
                <div>
                  <div className="text-slate-400">Nhiệt Công Nghiệp Đồng Phát (600°C+):</div>
                  <div className="text-sm font-bold text-amber-300 font-mono">
                    +{result.powerCyclePerformance.highTemperatureHeatCoGenerationMwTh} MWth
                  </div>
                </div>
                <ThermometerSun className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PASSIVE FREEZE PLUG SAFETY SIMULATION */}
      {activeTab === 'PASSIVE_FREEZE_PLUG_SAFETY_SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* SBO Interactive Test Station */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Thí Nghiệm Mất Điện Toàn Nhà Máy (Station Blackout - SBO)</span>
              </h3>

              <button
                onClick={toggleStationBlackout}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isStationBlackoutActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400 animate-pulse'
                    : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 hover:bg-emerald-500'
                }`}
              >
                {isStationBlackoutActive ? (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    <span>HỦY MÔ PHỎNG SBO</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4" />
                    <span>KÍCH HOẠT SBO (MẤT ĐIỆN)</span>
                  </>
                )}
              </button>
            </div>

            {/* Status Indicator */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                isStationBlackoutActive
                  ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                  : 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold">
                {isStationBlackoutActive ? (
                  <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
                <span>
                  Trạng Thái Thành Phao Đóng Băng:{' '}
                  {isStationBlackoutActive ? 'ĐANG CHẢY TỰ NHIÊN (PASSIVELY MELTING)' : 'ĐÓNG BĂNG RẮN CHẮC (SOLID)'}
                </span>
              </div>
              <p className="text-xs mt-1.5 opacity-90 leading-relaxed">
                {isStationBlackoutActive
                  ? 'Quạt làm mát cưỡng bức ngừng hoạt động do mất điện lưới. Nhiệt phân hạch dư làm phao muối đông tan chảy trong 4.5 phút. Toàn bộ muối nhiên liệu chảy tự do theo trọng lực xuống bể xả dưới lòng đất.'
                  : 'Quạt thổi khí làm mát liên tục giữ cho khối muối tại đáy lò ở trạng thái rắn (-200°C dưới điểm nóng chảy), đóng vai trò như một van an toàn cơ học tự nhiên.'}
              </p>
            </div>

            {/* SBO Timeline & Sequence */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Trình Tự An Toàn Thụ Động Khi Gặp Sự Cố (Walk-Away Safe):
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-start gap-2.5">
                  <span className="font-mono text-amber-400 font-bold shrink-0">T = 0 phút:</span>
                  <div className="text-slate-300">
                    Sự cố mất điện toàn trạm (SBO) giống Fukushima. Bơm tuần hoàn và quạt làm mát phao đóng băng ngừng hoạt động hoàn toàn.
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-start gap-2.5">
                  <span className="font-mono text-amber-400 font-bold shrink-0">T + 4.5 phút:</span>
                  <div className="text-slate-300">
                    Nhiệt phân rã làm tan chảy nút muối đông cứng. Van mở ra mà không cần bất kỳ tín hiệu điện tử hay hành động của con người.
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-start gap-2.5">
                  <span className="font-mono text-amber-400 font-bold shrink-0">T + 6 phút:</span>
                  <div className="text-slate-300">
                    100% dung dịch muối nhiên liệu tự chảy xuống cụm bể xả ngầm phân tán dưới lòng đất. Hình học bể cách ly ngăn chặn phản ứng dây chuyền tiếp diễn (k_eff &lt; 0.90).
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-start gap-2.5">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">T + Vô hạn:</span>
                  <div className="text-slate-300">
                    Nhiệt phân rã ({result.passiveSafetyMetrics.decayHeatPassiveAirCoolingMwTh} MWth) được đối lưu không khí tự nhiên tản nhiệt ra khí quyển mãi mãi. Không bao giờ nóng chảy thủng đáy hay nổ phóng xạ!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subterranean Safety Chamber Schematic */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Bảo Vệ Đa Tầng Bất Khả Xâm Phạm</span>
              </h3>

              <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Khóa Giữ Hóa Học Hoàn Toàn (Chemical Trapping):</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Các sản phẩm phân hạch nguy hiểm nhất như I-131, Cs-137, Sr-90 phản ứng lập tức với muối fluoride tạo thành hợp chất ion muối rắn không bay hơi (CsF, SrF₂), giữ chặt trong chất lỏng ngay cả khi vỏ lò bị vỡ!
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Không Sản Sinh Khí Hydro (Zero Hydrogen Hazard):</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Lò không sử dụng nước làm mát áp suất cao và không có thanh bọc Zirconium như lò PWR. Không thể xảy ra phản ứng oxy hóa kim loại tạo khí hydro gây nổ khí như ở Fukushima.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Chế Độ Tự Ngắt An Toàn (Walk-Away Safe):</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Ngay cả khi toàn bộ kỹ sư vận hành rời bỏ trạm điều khiển, lò phản ứng LFTR vẫn tự động hạ nhiệt an toàn và chuyển về trạng thái ngủ thụ động vĩnh viễn.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-4 text-xs space-y-1">
              <div className="font-bold text-emerald-300">Chứng Chỉ An Toàn Thụ Động GIF Gen-IV:</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Đạt cấp độ an toàn cao nhất trong 6 thiết kế lò phản ứng Thế hệ IV. Không cần vùng sơ tán khẩn cấp ngoài bán kính 500m quanh nhà máy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THORIUM BREEDING & WASTE HORIZON */}
      {activeTab === 'THORIUM_BREEDING_AND_WASTE_HORIZON' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Transuranic Waste Elimination */}
            <div className="bg-slate-900/80 border border-emerald-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase">Xóa Bỏ Rác Thải Độc</span>
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                -{result.environmentalAndWasteAdvantages.transuranicWasteReductionPct}%
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Chu trình Thori không tạo ra các nguyên tố siêu urani tồn lưu dài như Plutoni-239, Americi-241 hay Curium.
              </div>
            </div>

            {/* 2. Waste Radiotoxicity Decay Time */}
            <div className="bg-slate-900/80 border border-amber-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Thời Gian Phân Rã Rác</span>
                <Timer className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                300 Năm
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Rác thải phân hạch giảm độc tính về mức quặng urani tự nhiên chỉ sau 300 năm (so với 300,000 năm của lò PWR cổ điển).
              </div>
            </div>

            {/* 3. Thorium Fuel Energy Density */}
            <div className="bg-slate-900/80 border border-cyan-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase">Mật Độ Năng Lượng Thori</span>
                <Flame className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                24 Triệu kWh/kg
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                1 kg Thori tự nhiên cháy sạch 100% sinh ra năng lượng tương đương 3,500,000 kg than đá hoặc 200 kg urani làm giàu!
              </div>
            </div>

            {/* 4. Thermal Efficiency with sCO2 */}
            <div className="bg-slate-900/80 border border-blue-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase">Hiệu Suất Nhiệt sCO₂</span>
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-400 font-mono">
                {result.powerCyclePerformance.grossThermalEfficiencyPct}%
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Nhiệt độ muối cao (720°C) kết hợp chu trình sCO₂ Brayton tái nén giúp kích thước tuabin nhỏ hơn 10 lần so với tuabin hơi nước.
              </div>
            </div>
          </div>

          {/* Detailed LFTR vs LWR Comparison Matrix */}
          <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Bảng Đối Chiếu: Lò Phản Ứng Muối Lỏng Thori (LFTR) vs Lò Nước Nhẹ (PWR/BWR)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Đặc Tính Kỹ Thuật</th>
                    <th className="py-2.5 px-3 text-amber-400 font-bold">Lò Muối Lỏng Thori (LFTR MSR)</th>
                    <th className="py-2.5 px-3 text-slate-400">Lò Nước Nhẹ Cổ Điển (PWR/BWR)</th>
                    <th className="py-2.5 px-3 text-emerald-400">Ưu Thế Vượt Trội</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Áp suất vận hành</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">1.5 bar (Khí quyển)</td>
                    <td className="py-2.5 px-3 text-slate-400">155 bar (Rất cao)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-sans">Loại bỏ nguy cơ nổ nén vỡ vỏ lò</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Nhiệt độ chất làm mát</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">700 - 750°C</td>
                    <td className="py-2.5 px-3 text-slate-400">300 - 325°C</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-sans">Hiệu suất điện 50% + Cung cấp nhiệt cao</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Trạng thái nhiên liệu</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">Chất lỏng đồng nhất (Muối lỏng)</td>
                    <td className="py-2.5 px-3 text-slate-400">Viên rắn bọc Zircaloy</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-sans">Không có sự cố nóng chảy thanh nhiên liệu</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Thời gian bán rã rác thải</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">300 năm</td>
                    <td className="py-2.5 px-3 text-slate-400">300,000 năm</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-sans">Rút ngắn 1,000 lần gánh nặng lưu trữ</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Xử lý độc Xenon-135</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">Sục khí Heli liên tục (&gt;99%)</td>
                    <td className="py-2.5 px-3 text-slate-400">Tích lũy gây "hố độc" Xenon</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-sans">Vận hành liên tục không sợ chết máy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
