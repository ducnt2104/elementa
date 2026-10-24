// src/components/visualizations/DirectLithiumExtractionVisualizer.tsx
// Interactive Visualizer: Direct Lithium Extraction (DLE) & Geothermal Brine Ion-Sieve Kinetics
// Conforms to: IUPAC Ion Exchange & Coordination Chemistry, IEA Critical Minerals 2024 & Vietnam GDPT 2018 (Hóa học 12: Kim loại kiềm, Bán kính ion, Trao đổi ion, Tích số tan Ksp & Pin Li-ion)

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Layers,
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
  ShieldAlert,
  Compass,
  Repeat
} from 'lucide-react';
import {
  DleTechnologyType,
  BrineComposition,
  DleOperatingConditions,
  KNOWN_BRINE_RESERVOIRS,
  ION_STERIC_PROFILES,
  simulateDlePerformance
} from '../../domain/directLithiumExtractionEngine';
import { sound } from '../../audio/soundEngine';

type DleTabMode = 'STERIC_ION_SIEVE_CAVITY' | 'KINETICS_AND_BRINE_RESERVOIRS' | 'LCE_ECONOMICS_AND_WATER_SAVINGS';

export const DirectLithiumExtractionVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DleTabMode>('STERIC_ION_SIEVE_CAVITY');
  const [selectedTech, setSelectedTech] = useState<DleTechnologyType>('MANGANESE_ION_SIEVE');
  const [selectedReservoirIndex, setSelectedReservoirIndex] = useState<number>(0);

  // Sliders
  const [brineFlowRateM3h, setBrineFlowRateM3h] = useState<number>(500);
  const [elutionTempC, setElutionTempC] = useState<number>(75);
  const [operatingCycleMinutes, setOperatingCycleMinutes] = useState<number>(90);
  const [electricityPriceUsdKwh, setElectricityPriceUsdKwh] = useState<number>(0.05);
  const [activeIonSymbol, setActiveIonSymbol] = useState<string>('Li⁺');

  const selectedBrine = KNOWN_BRINE_RESERVOIRS[selectedReservoirIndex];

  // Simulation results
  const sim = useMemo(() => {
    const conditions: DleOperatingConditions = {
      brineFlowRateM3h,
      sorbentBedVolumeM3: 80,
      operatingCycleMinutes,
      acidElutionConcentrationM: 0.25,
      elutionTempC,
      heatRecoveryEnabled: true,
      electricityPriceUsdKwh,
      hydrochloricAcidPriceUsdTon: 120,
      sodaAshPriceUsdTon: 280
    };
    return simulateDlePerformance(selectedTech, selectedBrine, conditions);
  }, [
    selectedTech,
    selectedBrine,
    brineFlowRateM3h,
    operatingCycleMinutes,
    elutionTempC,
    electricityPriceUsdKwh
  ]);

  const handleTabChange = (tab: DleTabMode) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  const handleTechChange = (tech: DleTechnologyType) => {
    sound.playUiClick();
    setSelectedTech(tech);
  };

  const handleReservoirChange = (idx: number) => {
    sound.playUiClick();
    setSelectedReservoirIndex(idx);
  };

  const handleIonSelect = (sym: string) => {
    sound.playUiClick();
    setActiveIonSymbol(sym);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Khai Thác Liti Trực Tiếp Từ Địa Nhiệt (Direct Lithium Extraction - DLE)
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  IEA Critical Minerals 2024
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Sàng ion oxit kim loại kích thước dưới nanomet (0.76 Å), Thu hồi Liti &gt; 92% trong 2 giờ & Tiết kiệm 99% lượng nước
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('STERIC_ION_SIEVE_CAVITY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'STERIC_ION_SIEVE_CAVITY'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sàng Ion Dưới Nanomet
          </button>
          <button
            onClick={() => handleTabChange('KINETICS_AND_BRINE_RESERVOIRS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'KINETICS_AND_BRINE_RESERVOIRS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Động Học & Nguồn Địa Nhiệt
          </button>
          <button
            onClick={() => handleTabChange('LCE_ECONOMICS_AND_WATER_SAVINGS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'LCE_ECONOMICS_AND_WATER_SAVINGS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Kinh Tế LCE & Bảo Vệ Nước
          </button>
        </div>
      </div>

      {/* Technology & Reservoir Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Công Nghệ Sorbent:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTechChange('MANGANESE_ION_SIEVE')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'MANGANESE_ION_SIEVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Oxit Mangan (HMO Sieve)
            </button>
            <button
              onClick={() => handleTechChange('ALUMINUM_LDH_SORBENT')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'ALUMINUM_LDH_SORBENT'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Nhôm Hydroxit Xen Lớp (Al-LDH)
            </button>
            <button
              onClick={() => handleTechChange('ELECTROCHEMICAL_INTERCALATION')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'ELECTROCHEMICAL_INTERCALATION'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Điện Hóa (LFP Intercalation)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Thu hồi:</span>
            <span className="text-emerald-400 font-bold">{sim.recoveryEfficiencyPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Độ tinh khiết:</span>
            <span className="text-cyan-400 font-bold">{sim.purityEluatePct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Sản lượng LCE:</span>
            <span className="text-amber-400 font-bold">{sim.lceProductionTonsYear} tấn/năm</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {/* TAB 1: STERIC ION SIEVE CAVITY */}
        {activeTab === 'STERIC_ION_SIEVE_CAVITY' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* SVG Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Cơ Chế Khóa Kích Thước Lưới Tinh Thể HMO (HMnO₂ Cavity):</span>
                <span className="font-mono text-emerald-400">Khẩu độ hốc: ~ 0.76 Å</span>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                <svg viewBox="0 0 700 420" className="w-full h-full">
                  <defs>
                    <radialGradient id="liIonGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
                    </radialGradient>
                    <radialGradient id="mgIonGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.6" />
                    </radialGradient>
                    <radialGradient id="naIonGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
                    </radialGradient>
                  </defs>

                  {/* Sorbent Lattice Wall (Left & Right) */}
                  <g>
                    {/* Lattice Blocks representing MnO6 octahedra */}
                    <rect x="50" y="50" width="160" height="320" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                    <text x="130" y="80" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Lưới Tinh Thể Spinel
                    </text>
                    <text x="130" y="100" fill="#64748b" fontSize="10" textAnchor="middle">
                      λ-MnO₂ / HMnO (Oxit Mangan)
                    </text>

                    {/* Octahedral nodes */}
                    {[130, 180, 230, 280, 330].map(y => (
                      <g key={y}>
                        <circle cx="90" cy={y} r="12" fill="#475569" stroke="#64748b" />
                        <text x="90" y={y + 4} fill="#f1f5f9" fontSize="8" fontWeight="bold" textAnchor="middle">Mn</text>
                        <circle cx="170" cy={y} r="12" fill="#475569" stroke="#64748b" />
                        <text x="170" y={y + 4} fill="#f1f5f9" fontSize="8" fontWeight="bold" textAnchor="middle">Mn</text>
                      </g>
                    ))}
                  </g>

                  {/* Central Nanoporous Cavity Channel */}
                  <rect x="230" y="50" width="240" height="320" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
                  <text x="350" y="80" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Kênh Chọn Lọc Dưới Nanomet (0.76 Å)
                  </text>
                  <text x="350" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Cân bằng trao đổi: HMnO(s) + Li⁺ ⇄ LiMnO(s) + H⁺
                  </text>

                  {/* Incoming Brine Ions Demonstration */}
                  {/* Ion 1: Li+ (Target) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleIonSelect('Li⁺')}
                  >
                    <circle cx="350" cy="170" r="22" fill="url(#liIonGlow)" stroke="#10b981" strokeWidth={activeIonSymbol === 'Li⁺' ? '3' : '1.5'} />
                    <text x="350" y="174" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Li⁺</text>
                    <text x="350" y="205" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                      r = 0.76 Å [LỌT HOÀN HẢO]
                    </text>
                  </g>

                  {/* Ion 2: Na+ (Too large) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleIonSelect('Na⁺')}
                  >
                    <circle cx="280" cy="270" r="32" fill="url(#naIonGlow)" stroke="#f59e0b" strokeWidth={activeIonSymbol === 'Na⁺' ? '3' : '1.5'} />
                    <text x="280" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Na⁺</text>
                    <text x="280" y="315" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">
                      r = 1.02 Å (Quá to - Bị chặn)
                    </text>
                  </g>

                  {/* Ion 3: Mg2+ (Hydration blocked) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleIonSelect('Mg²⁺')}
                  >
                    {/* Hydration shell halo */}
                    <circle cx="420" cy="270" r="38" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="420" cy="270" r="21" fill="url(#mgIonGlow)" stroke="#ef4444" strokeWidth={activeIonSymbol === 'Mg²⁺' ? '3' : '1.5'} />
                    <text x="420" y="274" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Mg²⁺</text>
                    <text x="420" y="315" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">
                      Vỏ solvat dày (ΔH = -1921 kJ)
                    </text>
                  </g>

                  {/* Right Column: Desorption Column */}
                  <g>
                    <rect x="490" y="50" width="160" height="320" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                    <text x="570" y="80" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Rửa Giải Thu Hồi
                    </text>
                    <text x="570" y="100" fill="#64748b" fontSize="10" textAnchor="middle">
                      {selectedTech === 'ALUMINUM_LDH_SORBENT' ? 'Nước Nóng 75°C (Zero Acid)' : 'Axit HCl Loãng (0.25M)'}
                    </text>

                    {/* Eluate Product Output */}
                    <circle cx="570" cy="180" r="28" fill="#047857" stroke="#34d399" strokeWidth="2" />
                    <text x="570" y="185" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">LiCl</text>
                    <text x="570" y="225" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Dung dịch LiCl 99.4%
                    </text>
                    <text x="570" y="245" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                      + Na₂CO₃ → Li₂CO₃↓
                    </text>
                    <text x="570" y="260" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                      (Pin LFP & NCM)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Steric Profiles & Ion Comparison */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Bảng So Sánh Bán Kính Ion & Năng Lượng Hydrat Hóa:
                </span>

                <div className="flex flex-col gap-2 mt-2">
                  {ION_STERIC_PROFILES.map(item => (
                    <div
                      key={item.symbol}
                      onClick={() => handleIonSelect(item.symbol)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        activeIonSymbol === item.symbol
                          ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{item.ion}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          item.sieveStericFit === 'PERFECT_FIT'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {item.sieveStericFit === 'PERFECT_FIT' ? '✓ Khớp Kích Thước' : '✗ Bị Loại Trừ'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mt-1">
                        <div>Bán kính tinh thể: <span className="text-slate-200 font-bold">{item.ionicRadiusAngstrom} Å</span></div>
                        <div>Năng lượng solvat: <span className="text-amber-400 font-bold">{item.hydrationEnthalpyKjMol} kJ/mol</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chemical Equations Box */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Phương Trình Hóa Học Trao Đổi & Kết Tủa Pin:
                </span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    Hấp phụ: HMnO(s) + Li⁺(aq) ⇄ LiMnO(s) + H⁺(aq)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    Rửa giải: LiMnO(s) + HCl(aq) ⇄ HMnO(s) + LiCl(aq)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-400">
                    Kết tủa LCE: 2 LiCl(aq) + Na₂CO₃(aq) → Li₂CO₃(s)↓ + 2 NaCl
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Động Học & Nguồn Địa Nhiệt */}
        {activeTab === 'KINETICS_AND_BRINE_RESERVOIRS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Reservoir Selector and Sliders */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Chọn Nguồn Nước Địa Nhiệt Toàn Cầu:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Điển hình: Mỏ Salton Sea (Mỹ), Thung lũng Rhine (Đức/Pháp) & Sa mạc Atacama
                </p>
              </div>

              {/* Reservoir Select Buttons */}
              <div className="flex flex-col gap-2">
                {KNOWN_BRINE_RESERVOIRS.map((res, idx) => (
                  <button
                    key={res.name}
                    onClick={() => handleReservoirChange(idx)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedReservoirIndex === idx
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{res.name}</span>
                      <span className="text-amber-400 font-mono">{res.temperatureC}°C</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      Li: <strong className="text-emerald-400">{res.liPpm} ppm</strong> | Mg/Li: <strong className={res.mgToLiMassRatio > 5 ? 'text-red-400' : 'text-slate-200'}>{res.mgToLiMassRatio}</strong>
                    </div>
                  </button>
                ))}
              </div>

              {/* Slider 1: Brine Flow Rate */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Lưu lượng nước địa nhiệt xử lý:</span>
                  <span className="font-mono text-emerald-400 font-bold">{brineFlowRateM3h} m³/h</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={brineFlowRateM3h}
                  onChange={e => setBrineFlowRateM3h(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Operating Cycle Time */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Thời gian 1 chu kỳ Hấp phụ - Rửa:</span>
                  <span className="font-mono text-cyan-400 font-bold">{operatingCycleMinutes} phút</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="10"
                  value={operatingCycleMinutes}
                  onChange={e => setOperatingCycleMinutes(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Elution Temperature */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Nhiệt độ rửa giải (Nhiệt địa nhiệt):</span>
                  <span className="font-mono text-amber-400 font-bold">{elutionTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  step="5"
                  value={elutionTempC}
                  onChange={e => setElutionTempC(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Performance Metrics Dashboard */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Động Học Thu Hồi & Tuyển Lựa Trong Dòng Chảy Liên Tục:
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Hiệu Suất Thu Hồi Liti
                    </span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1">
                      {sim.recoveryEfficiencyPct}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (Hồ bay hơi truyền thống chỉ đạt ~45%)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Độ Tinh Khiết Dòng LiCl
                    </span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 block mt-1">
                      {sim.purityEluatePct}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (Sẵn sàng tạo Li₂CO₃ loại pin Battery-Grade)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Độ Tuyển Lựa Li/Mg:</span>
                    <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">
                      {sim.selectivityLiOverMg} : 1
                    </span>
                    <span className="text-[10px] text-slate-500">Loại bỏ hoàn toàn ion cản trở Mg²⁺</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Độ Tuyển Lựa Li/Na:</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                      {sim.selectivityLiOverNa} : 1
                    </span>
                    <span className="text-[10px] text-slate-500">Chặn muối ăn NaCl nồng độ cao</span>
                  </div>
                </div>

                {/* Daily Output */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Liti kim loại thu gom:</span>
                    <span className="text-emerald-400 font-bold">{sim.liExtractedKgDay} kg Li / ngày</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Quy đổi LCE (Li₂CO₃):</span>
                    <span className="text-white font-bold">{sim.lceProductionTonsYear} tấn LCE / năm</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Khối lượng nước địa nhiệt xử lý:</span>
                    <span className="text-cyan-400">{sim.brineProcessedM3Day.toLocaleString()} m³ / ngày</span>
                  </div>
                </div>
              </div>

              {/* Geothermal Reinjection Notice */}
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300/90 leading-relaxed font-mono">
                <span className="font-bold flex items-center gap-1.5 text-emerald-200 mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bơm Tái Ép Nước Địa Nhiệt 100% Khép Kín:
                </span>
                Sau khi tách Liti qua cột sorbent, 100% dòng nước địa nhiệt được bơm áp lực trở lại tầng ngầm sâu 2,000m để nhận nhiệt tái tạo từ lòng đất. Toàn bộ chu trình không tạo hồ chứa lộ thiên, không gây lún đất và không tiêu hao nguồn nước ngầm quý giá của địa phương.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Kinh Tế LCE & Đối Nghịch Với Hồ Bay Hơi */}
        {activeTab === 'LCE_ECONOMICS_AND_WATER_SAVINGS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cost Breakdown */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Cơ Cấu Giá Thành Sản Xuất ($ / kg LCE):
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chi phí hóa chất xút soda, điện bơm và khấu hao vật liệu sorbent
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Hóa chất (Soda Ash Na₂CO₃ & Axit):</span>
                  <span className="text-amber-400 font-bold">${sim.operatingCostsBreakdown.reagentsCostPerKgLce}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Điện năng bơm qua cột hấp phụ:</span>
                  <span className="text-cyan-400 font-bold">${sim.operatingCostsBreakdown.electricityCostPerKgLce}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Nhiệt năng rửa giải (Tận dụng địa nhiệt):</span>
                  <span className="text-slate-200 font-bold">${sim.operatingCostsBreakdown.thermalCostPerKgLce}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Khấu hao vật liệu sorbent (Thay sau 3 năm):</span>
                  <span className="text-slate-200 font-bold">${sim.operatingCostsBreakdown.sorbentDepreciationPerKgLce}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm">
                  <span>Tổng Giá Thành OPEX:</span>
                  <span className="text-emerald-400">${sim.operatingCostsBreakdown.totalOpexPerKgLce} / kg LCE</span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  (${sim.operatingCostsBreakdown.totalOpexPerTonLce} / tấn LCE)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-200 block mb-1">Cạnh Tranh Kinh Tế Toàn Cầu:</span>
                Chi phí OPEX DLE từ $1,300 - $1,800/tấn LCE cạnh tranh trực tiếp với các mỏ đá Spodumene ở Úc ($4,000 - $6,000/tấn) và các hồ bay hơi Nam Mỹ ($2,500 - $3,500/tấn), đem lại tỷ suất lợi nhuận vượt trội cho chuỗi cung ứng pin xe điện toàn cầu.
              </div>
            </div>

            {/* DLE vs Traditional Evaporation Matrix */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  So Sánh DLE Địa Nhiệt vs Hồ Bay Hơi Nam Mỹ (Atacama / Uyuni):
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  {/* Traditional Pond Card */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-red-500/30 text-xs space-y-2">
                    <span className="font-bold text-red-400 flex items-center gap-1">
                      <Sun className="w-4 h-4" /> Hồ Bay Hơi Truyền Thống
                    </span>
                    <div className="font-mono text-slate-300 space-y-1 text-[11px]">
                      <div>• Thời gian: <strong className="text-amber-400">12 - 18 tháng</strong></div>
                      <div>• Tỷ lệ thu hồi: <strong className="text-red-400">40% - 50%</strong></div>
                      <div>• Diện tích mặt đất: <strong className="text-amber-400">{sim.traditionalEvaporationComparison.evaporationFootprintKm2} km²</strong></div>
                      <div>• Thất thoát nước: <strong className="text-red-400">250 m³ nước / tấn LCE</strong></div>
                    </div>
                  </div>

                  {/* DLE Technology Card */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-2 shadow-inner">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> DLE Khép Kín Địa Nhiệt
                    </span>
                    <div className="font-mono text-emerald-200 space-y-1 text-[11px]">
                      <div>• Thời gian: <strong className="text-emerald-300">1.5 - 2 giờ</strong></div>
                      <div>• Tỷ lệ thu hồi: <strong className="text-emerald-300">{sim.recoveryEfficiencyPct}%</strong></div>
                      <div>• Diện tích nhà máy: <strong className="text-emerald-300">&lt; 0.05 km²</strong></div>
                      <div>• Nước ngọt bảo tồn: <strong className="text-emerald-300">99% bảo lưu</strong></div>
                    </div>
                  </div>
                </div>

                {/* Big Water Savings Callout */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                      Lượng Nước Ngọt Tiết Kiệm Hàng Năm:
                    </span>
                    <span className="text-xl font-bold font-mono text-cyan-400">
                      {sim.traditionalEvaporationComparison.dleWaterSavingsM3Year.toLocaleString()} m³ / năm
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Giảm thiểu khủng hoảng cạn kiệt nước ngầm tại các sa mạc khô hạn, bảo vệ sinh thái thổ dân bản địa và cung cấp nguồn Liti xanh đạt chuẩn ESG cao nhất thế giới.
                  </p>
                </div>
              </div>

              {/* GDPT Chemistry Curriculum Alignment */}
              <div className="mt-4 p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300/90 leading-relaxed font-mono">
                <span className="font-bold text-cyan-200 block mb-0.5">
                  Tích Hợp Giáo Dục Hóa Học 12 (GDPT 2018):
                </span>
                Áp dụng kiến thức về Bán kính ion kim loại kiềm nhóm IA (Li⁺ &lt; Na⁺ &lt; K⁺), cân bằng trao đổi ion thuận nghịch, và tích số tan Ksp của muối cacbonat (Li₂CO₃ ít tan trong nước nóng, dễ kết tủa tinh khiết tách khỏi NaCl hòa tan tốt).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DirectLithiumExtractionVisualizer;
