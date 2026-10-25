// src/components/visualizations/MicrobialElectrosynthesisVisualizer.tsx
// Interactive Visualizer: Microbial Electrosynthesis (MES) & Gas-Diffusion Biocathode CO2 Valorization
// Conforms to: Wood-Ljungdahl Pathway (WLP), Nernstian Bioelectrochemical Kinetics, IUPAC & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Gauge,
  Sliders,
  BarChart3,
  Factory,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Sparkles,
  Dna,
  Bug
} from 'lucide-react';
import {
  ElectroactiveMicrobeType,
  CathodeArchitectureType,
  ELECTROACTIVE_MICROBE_CATALOG,
  CATHODE_ARCHITECTURE_CATALOG,
  calculateMesKinetics,
  calculateMesPlantBalance,
  evaluateBiofilmHealth,
  CARBON_VALORIZATION_BENCHMARKS
} from '../../domain/microbialElectrosynthesisEngine';
import { sound } from '../../audio/soundEngine';

type MesTabMode =
  | 'BIOELECTROCHEMICAL_CELL_AND_GDB'
  | 'PLANT_MASS_ENERGY_SIMULATOR'
  | 'BIOFILM_HEALTH_AND_BENCHMARK';

export const MicrobialElectrosynthesisVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MesTabMode>('BIOELECTROCHEMICAL_CELL_AND_GDB');

  // Mode 1: Cell & GDB controls
  const [selectedMicrobe, setSelectedMicrobe] = useState<ElectroactiveMicrobeType>('SPOROMUSA_OVATA');
  const [selectedCathode, setSelectedCathode] = useState<CathodeArchitectureType>('GAS_DIFFUSION_PTFE_CARBON');
  const [cathodePotentialV, setCathodePotentialV] = useState<number>(-0.65);
  const [electrolytePh, setElectrolytePh] = useState<number>(7.0);

  // Mode 2: Plant Simulation controls
  const [totalCathodeAreaM2, setTotalCathodeAreaM2] = useState<number>(500);

  // Mode 3: Biofilm Health controls
  const [biofilmThicknessMicrons, setBiofilmThicknessMicrons] = useState<number>(45);

  // Calculations
  const kinetics = useMemo(() => {
    return calculateMesKinetics({
      microbeType: selectedMicrobe,
      cathodeType: selectedCathode,
      cathodePotentialVvsShe: cathodePotentialV,
      electrolytePh
    });
  }, [selectedMicrobe, selectedCathode, cathodePotentialV, electrolytePh]);

  const plantBalance = useMemo(() => {
    return calculateMesPlantBalance({
      totalCathodeAreaM2,
      microbeType: selectedMicrobe,
      cathodeType: selectedCathode,
      cathodePotentialVvsShe: cathodePotentialV,
      electrolytePh
    });
  }, [totalCathodeAreaM2, selectedMicrobe, selectedCathode, cathodePotentialV, electrolytePh]);

  const biofilmHealth = useMemo(() => {
    return evaluateBiofilmHealth(biofilmThicknessMicrons);
  }, [biofilmThicknessMicrons]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-400 shadow-inner">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Điện Hóa Sinh Học MES (Microbial Electrosynthesis) &amp; Biocathode Khuếch Tán Khí
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Wood-Ljungdahl Pathway
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Vi sinh vật điện hoạt tính khử khí CO₂ thành axit axetic và etanol sinh học bằng điện tái tạo với hiệu suất dòng điện &gt; 90%
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('BIOELECTROCHEMICAL_CELL_AND_GDB');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'BIOELECTROCHEMICAL_CELL_AND_GDB'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Pin MES &amp; Biocathode GDB
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PLANT_MASS_ENERGY_SIMULATOR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PLANT_MASS_ENERGY_SIMULATOR'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Cân Bằng Vật Chất Nhà Máy
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('BIOFILM_HEALTH_AND_BENCHMARK');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'BIOFILM_HEALTH_AND_BENCHMARK'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Màng Biofilm &amp; So Sánh
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* MODE 1: BIOELECTROCHEMICAL CELL & GDB */}
        {activeMode === 'BIOELECTROCHEMICAL_CELL_AND_GDB' && (
          <div className="space-y-6">
            {/* Interactive SVG Diagram */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Sơ Đồ Pin Điện Hóa Sinh Học MES 2 Ngăn Với Cực Âm Khuếch Tán Khí GDB
                </span>
                <span className="text-[11px] text-slate-400">
                  Phản ứng khử: 2 CO₂ + 8 H⁺ + 8e⁻ → CH₃COOH + 2 H₂O (E°' = -0.28 V vs SHE)
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
                <svg viewBox="0 0 900 270" className="w-full max-w-4xl h-auto select-none">
                  {/* Anode Chamber (Left) */}
                  <rect x="80" y="40" width="300" height="190" rx="10" fill="#0c4a6e" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="230" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Ngăn Cực Dương Anot (OER)
                  </text>
                  <text x="230" y="82" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    2 H₂O → O₂ + 4 H⁺ + 4e⁻ (E° = +0.815 V)
                  </text>

                  {/* Anode electrode mesh */}
                  <rect x="110" y="95" width="20" height="110" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="120" y="155" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 120 155)">
                    Lưới IrO₂ / Ti
                  </text>

                  {/* Oxygen bubble generation */}
                  {[0, 1, 2, 3].map(i => (
                    <circle key={i} cx={150 + i * 20} cy={160 - i * 20} r={4 + i} fill="#38bdf8" opacity="0.6" />
                  ))}
                  <text x="220" y="180" fill="#38bdf8" fontSize="10" textAnchor="middle">
                    O₂ Bọt Khí Bay Lên
                  </text>

                  {/* Central Proton Exchange Membrane (PEM) */}
                  <rect x="380" y="30" width="20" height="210" rx="4" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2" />
                  <text x="390" y="140" fill="#042f2e" fontSize="10" fontWeight="black" textAnchor="middle" transform="rotate(-90 390 140)">
                    Màng PEM / AEM
                  </text>

                  {/* Proton transport arrow */}
                  <line x1="330" y1="135" x2="430" y2="135" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="3 3" />
                  <text x="390" y="115" fill="#5eead4" fontSize="11" fontWeight="bold" textAnchor="middle">
                    H⁺ →
                  </text>

                  {/* Cathode Chamber (Right) */}
                  <rect x="400" y="40" width="420" height="190" rx="10" fill="#134e4a" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="610" y="65" fill="#2dd4bf" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Ngăn Biocathode Vi Sinh (Con Đường Wood-Ljungdahl)
                  </text>

                  {/* Gas-Diffusion Cathode (3-phase boundary) */}
                  {/* Hydrophobic PTFE layer */}
                  <rect x="700" y="90" width="16" height="120" rx="2" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                  <text x="708" y="155" fill="#f8fafc" fontSize="9" textAnchor="middle" transform="rotate(90 708 155)">
                    Lớp PTFE Kỵ Nước
                  </text>

                  {/* Carbon felt / cloth */}
                  <rect x="670" y="90" width="30" height="120" rx="2" fill="#1e293b" stroke="#0d9488" strokeWidth="1.5" />

                  {/* Biofilm of Sporomusa ovata */}
                  <rect x="645" y="95" width="25" height="110" rx="4" fill="#059669" opacity="0.85" stroke="#10b981" strokeWidth="1.5" />
                  <text x="657" y="155" fill="#ecfdf5" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 657 155)">
                    Biofilm S. ovata ({biofilmHealth.biofilmThicknessMicrons} µm)
                  </text>

                  {/* CO2 gas inlet on the back */}
                  <line x1="780" y1="150" x2="716" y2="150" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                  <rect x="770" y="130" width="100" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                  <text x="820" y="148" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Khí CO₂ Nạp</text>
                  <text x="820" y="162" fill="#94a3b8" fontSize="8" textAnchor="middle">Áp suất 1 bar</text>

                  {/* Liquid product outlet: Acetic Acid */}
                  <line x1="520" y1="210" x2="520" y2="245" stroke="#10b981" strokeWidth="3" />
                  <rect x="460" y="235" width="120" height="30" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="520" y="254" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CH₃COOH (Axetat lỏng)
                  </text>

                  {/* Power Source on top */}
                  <line x1="120" y1="95" x2="120" y2="20" stroke="#ef4444" strokeWidth="2" />
                  <line x1="120" y1="20" x2="685" y2="20" stroke="#ef4444" strokeWidth="2" />
                  <line x1="685" y1="20" x2="685" y2="90" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="400" cy="20" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="400" y="24" fill="#fbbf24" fontSize="10" fontWeight="black" textAnchor="middle">
                    {kinetics.cellVoltageVolts}V
                  </text>
                </svg>
              </div>
            </div>

            {/* Controls for Potential, pH, Microbe, Cathode */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Cathode Potential Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Thế Cực Âm (vs SHE):</span>
                  <span className="text-teal-400 font-bold">{cathodePotentialV.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="-0.90"
                  max="-0.40"
                  step="0.01"
                  value={cathodePotentialV}
                  onChange={e => {
                    sound.playUiClick();
                    setCathodePotentialV(parseFloat(e.target.value));
                  }}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">
                  Quá thế khử CO₂: <span className="text-teal-300 font-mono">{kinetics.co2ReductionOverpotentialV} V</span>. Thế càng âm dòng điện càng lớn nhưng dễ thoát khí H₂ ký sinh.
                </div>
              </div>

              {/* pH Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Độ pH Dung Dịch Đệm:</span>
                  <span className="text-cyan-400 font-bold">{electrolytePh.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="5.5"
                  max="8.5"
                  step="0.1"
                  value={electrolytePh}
                  onChange={e => {
                    sound.playUiClick();
                    setElectrolytePh(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">
                  pH tối ưu vi khuẩn: 6.8 - 7.2. Ảnh hưởng trực tiếp đến thế Nernst (-59.1 mV/đơn vị pH).
                </div>
              </div>

              {/* Microbe Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Vi Sinh Điện Hoạt Tính:</label>
                <select
                  value={selectedMicrobe}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedMicrobe(e.target.value as ElectroactiveMicrobeType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-teal-300 focus:outline-none focus:border-teal-500"
                >
                  {Object.values(ELECTROACTIVE_MICROBE_CATALOG).map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {ELECTROACTIVE_MICROBE_CATALOG[selectedMicrobe].description}
                </div>
              </div>

              {/* Cathode Architecture Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Cấu Trúc Biocathode:</label>
                <select
                  value={selectedCathode}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedCathode(e.target.value as CathodeArchitectureType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-teal-300 focus:outline-none focus:border-teal-500"
                >
                  {Object.values(CATHODE_ARCHITECTURE_CATALOG).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {CATHODE_ARCHITECTURE_CATALOG[selectedCathode].description}
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Mật Độ Dòng Điện:</span>
                <div className="text-lg font-bold text-teal-400 font-mono">{kinetics.currentDensityAPerM2} A/m²</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Hiệu Suất Coulombic (CE):</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">{kinetics.coulombicEfficiencyPct}%</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Năng Suất Thể Tích:</span>
                <div className="text-lg font-bold text-cyan-400 font-mono">{kinetics.volumetricProductivityGPerLDay} g/(L·ngày)</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Điện Áp Cực Tế Bào (V_cell):</span>
                <div className="text-lg font-bold text-amber-400 font-mono">{kinetics.cellVoltageVolts} V</div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: PLANT MASS & ENERGY SIMULATOR */}
        {activeMode === 'PLANT_MASS_ENERGY_SIMULATOR' && (
          <div className="space-y-6">
            {/* Input Controls */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-teal-400" />
                Quy Mô Ngăn Biocathode Nhà Máy Điện Hóa Sinh Học MES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tổng diện tích cực âm Cathode Stack:</span>
                    <span className="font-bold text-teal-400">{totalCathodeAreaM2.toLocaleString()} m²</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={totalCathodeAreaM2}
                    onChange={e => {
                      sound.playUiClick();
                      setTotalCathodeAreaM2(parseInt(e.target.value));
                    }}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    Cấu trúc xếp chồng dạng Filter-press với màng GDB và màng trao đổi anion
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dòng điện tổng cung cấp:</span>
                    <span className="font-bold text-cyan-400 font-mono">{plantBalance.appliedCurrentAmperes.toLocaleString()} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Công suất điện tiêu thụ:</span>
                    <span className="font-bold text-amber-400 font-mono">{plantBalance.electricPowerInputKw.toLocaleString()} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Suất tiêu hao điện (SEC):</span>
                    <span className="font-bold text-emerald-400 font-mono">{plantBalance.specificEnergyConsumptionKwhPerKgAcetate} kWh/kg axetat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-teal-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Khí CO₂ Thu Hút &amp; Khử</span>
                  <Factory className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-teal-300">
                  {plantBalance.co2ConsumptionRateKgPerHour} <span className="text-sm font-normal text-teal-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tổng cộng <span className="font-semibold text-teal-300">{plantBalance.co2AnnualMetricTonsCaptured} tấn CO₂/năm</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Sản Lượng Axit Axetic Sinh Học</span>
                  <Droplets className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-300">
                  {plantBalance.aceticAcidProductionKgPerHour} <span className="text-sm font-normal text-emerald-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tổng cộng <span className="font-semibold text-emerald-300">{plantBalance.aceticAcidAnnualMetricTons} tấn/năm</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Sản Lượng Etanol Sinh Học</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">
                  {plantBalance.ethanolProductionKgPerHour} <span className="text-sm font-normal text-cyan-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tổng cộng <span className="font-semibold text-cyan-300">{plantBalance.ethanolAnnualMetricTons} tấn/năm</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Giá Trị Thương Phẩm Hóa Chất</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300">
                  ${plantBalance.annualProductMarketValueUsd.toLocaleString()} <span className="text-sm font-normal text-amber-400">/năm</span>
                </div>
                <div className="text-xs text-slate-400">
                  Doanh thu axetat ($1,100/tấn) &amp; etanol ($900/tấn)
                </div>
              </div>
            </div>

            {/* Oxygen Co-Product Banner */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-200">Đồng Phát Oxy Y Tế Tại Cực Anot (OER)</div>
                  <div className="text-slate-400">Quá trình tách nước 2 H₂O → O₂ + 4 H⁺ + 4e⁻ sản sinh {plantBalance.oxygenCoProductKgPerHour} kg O₂/giờ</div>
                </div>
              </div>
              <span className="font-mono text-cyan-400 font-bold text-sm">
                {(plantBalance.oxygenCoProductKgPerHour * 8).toFixed(1)} tấn O₂/năm
              </span>
            </div>
          </div>
        )}

        {/* MODE 3: BIOFILM HEALTH & BENCHMARKS */}
        {activeMode === 'BIOFILM_HEALTH_AND_BENCHMARK' && (
          <div className="space-y-6">
            {/* Biofilm Thickness Simulator */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-teal-300 flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-teal-400" />
                Giám Sát Độ Dày &amp; Sức Khỏe Màng Sinh Học Biofilm (Sporomusa ovata)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Độ Dày Màng Sinh Học (Biofilm Thickness):</span>
                    <span className="text-teal-400 font-bold">{biofilmThicknessMicrons} µm</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={biofilmThicknessMicrons}
                    onChange={e => {
                      sound.playUiClick();
                      setBiofilmThicknessMicrons(parseInt(e.target.value));
                    }}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Khoảng tối ưu: <span className="text-emerald-300 font-bold">30 - 75 µm</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mật độ tế bào sống:</span>
                    <span className="font-bold text-teal-400 font-mono">{biofilmHealth.liveCellDensityCellsPerCm2.toExponential(2)} tế bào/cm²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Chất nền ngoại bào EPS:</span>
                    <span className="font-bold text-cyan-400 font-mono">{biofilmHealth.extracellularPolymericSubstancePct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trở kháng truyền electron:</span>
                    <span className="font-bold text-amber-400 font-mono">{biofilmHealth.electronTransferResistanceOhms} Ω</span>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs ${
                biofilmHealth.biofilmStatus === 'HEALTHY_EXPONENTIAL'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : biofilmHealth.biofilmStatus === 'STABLE_STATIONARY'
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                {biofilmHealth.biofilmStatus === 'HEALTHY_EXPONENTIAL' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {biofilmHealth.biofilmStatus === 'HEALTHY_EXPONENTIAL'
                      ? 'MÀNG BIOFILM KHỎE MẠNH — TRUYỀN ELECTRON TỐI ƯU'
                      : biofilmHealth.biofilmStatus === 'STABLE_STATIONARY'
                      ? 'MÀNG BIOFILM ỔN ĐỊNH — CẦN THEO DÕI KHUẾCH TÁN'
                      : 'CẢNH BÁO: NGUY CƠ BONG TRÓC HOẶC ĐÓI DINH DƯỠNG'}
                  </div>
                  <div className="leading-relaxed">{biofilmHealth.operationalAdvice}</div>
                </div>
              </div>
            </div>

            {/* Benchmark Matrix */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-400" />
                So Sánh 4 Công Nghệ Khử &amp; Tận Dụng Khí CO₂ (Carbon Valorization)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border-collapse">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Công Nghệ</th>
                      <th className="py-2.5 px-3">Nguồn Năng Lượng</th>
                      <th className="py-2.5 px-3">Điều Kiện Vận Hành</th>
                      <th className="py-2.5 px-3">Sản Phẩm Chính</th>
                      <th className="py-2.5 px-3">Hiệu Suất Coulombic</th>
                      <th className="py-2.5 px-3">Độ Chọn Lọc</th>
                      <th className="py-2.5 px-3">Độ Bền Xúc Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {CARBON_VALORIZATION_BENCHMARKS.map((b, idx) => (
                      <tr key={idx} className={b.technologyName.includes('MES') ? 'bg-teal-950/20 font-semibold' : 'hover:bg-slate-900/50'}>
                        <td className="py-2.5 px-3 font-bold text-slate-100">{b.technologyName}</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.energyInputType}</td>
                        <td className="py-2.5 px-3 text-slate-300">{b.reactionCondition}</td>
                        <td className="py-2.5 px-3 text-emerald-300 font-bold">{b.primaryProduct}</td>
                        <td className="py-2.5 px-3 text-teal-300 font-mono font-bold">{b.coulombicEnergyEfficiencyPct}%</td>
                        <td className="py-2.5 px-3 text-amber-300">{b.productSelectivityPct}%</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.catalystDurability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BAR */}
      <div className="bg-slate-900/90 p-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Dna className="w-4 h-4 text-teal-400" />
          <span>
            Wood-Ljungdahl Pathway • Sporomusa ovata • Cực Âm GDB Khuếch Tán Khí • 0.0 Phát Thải Hóa Thạch
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          CE = {kinetics.coulombicEfficiencyPct}% • J = {kinetics.currentDensityAPerM2} A/m² • SEC = {plantBalance.specificEnergyConsumptionKwhPerKgAcetate} kWh/kg
        </div>
      </div>
    </div>
  );
};
