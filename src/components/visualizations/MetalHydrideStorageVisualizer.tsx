// src/components/visualizations/MetalHydrideStorageVisualizer.tsx
// Interactive Visualizer: Metal-Hydride Solid-State Hydrogen Storage Engine
// Conforms to: IUPAC Physical Chemistry, IEA Hydrogen TCP & Vietnam GDPT 2018 Chemistry & Physics

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Gauge,
  TrendingUp,
  Droplets,
  Layers,
  ThermometerSun,
  Flame,
  Globe2,
  Box,
  Scale,
  Maximize2
} from 'lucide-react';
import {
  HydrideAlloyClass,
  HydrideStorageConditions,
  METAL_HYDRIDE_CATALOG,
  calculateHydrideStoragePerformance
} from '../../domain/metalHydrideStorageEngine';
import { sound } from '../../audio/soundEngine';

type HydrideTabMode =
  | 'PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION'
  | 'SOLID_STATE_TANK_AND_FUEL_CELL_COUPLING'
  | 'STORAGE_TECH_COMPARISON_AND_SAFETY';

export const MetalHydrideStorageVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HydrideTabMode>('PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION');
  const [selectedAlloy, setSelectedAlloy] = useState<HydrideAlloyClass>('AB5_INTERMETALLIC_LANI5');

  // Sliders
  const [storageTargetH2Kg, setStorageTargetH2Kg] = useState<number>(50.0);
  const [operatingTemperatureC, setOperatingTemperatureC] = useState<number>(25.0);
  const [appliedSupplyPressureBar, setAppliedSupplyPressureBar] = useState<number>(10.0);
  const [wasteHeatSourceTempC, setWasteHeatSourceTempC] = useState<number>(75.0);

  // Simulation calculation
  const result = useMemo(() => {
    const conditions: HydrideStorageConditions = {
      alloyType: selectedAlloy,
      storageTargetH2Kg,
      operatingTemperatureC,
      appliedSupplyPressureBar,
      coolingWaterSupplyTempC: 20.0,
      wasteHeatSourceTempC
    };
    return calculateHydrideStoragePerformance(conditions);
  }, [
    selectedAlloy,
    storageTargetH2Kg,
    operatingTemperatureC,
    appliedSupplyPressureBar,
    wasteHeatSourceTempC
  ]);

  const handleAlloyChange = (alloy: HydrideAlloyClass) => {
    sound.playUiClick();
    setSelectedAlloy(alloy);
    if (alloy === 'MAGNESIUM_HYDRIDE_MGH2') {
      setOperatingTemperatureC(290.0);
      setWasteHeatSourceTempC(320.0);
    } else if (alloy === 'COMPLEX_SODIUM_ALANATE_NAALH4') {
      setOperatingTemperatureC(120.0);
      setWasteHeatSourceTempC(140.0);
    } else if (alloy === 'COMPLEX_BOROHYDRIDE_LIBH4') {
      setOperatingTemperatureC(380.0);
      setWasteHeatSourceTempC(400.0);
    } else {
      setOperatingTemperatureC(25.0);
      setWasteHeatSourceTempC(75.0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-800/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Metal-Hydride Solid-State Hydrogen Storage Engine</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
              Lưu Trữ Hydro Trạng Thái Rắn Trong Mạng Tinh Thể Kim Loại
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-3xl leading-relaxed">
              Khóa hydro vào mạng tinh thể hợp kim liên kim (LaNi₅, TiMn₂, MgH₂) ở áp suất thấp (&lt; 10 bar), mật độ thể tích đạt 115 kg H₂/m³
              (vượt trội hơn hydro lỏng ở 20K), triệt tiêu nguy cơ nổ nén của bình 700 bar và tận dụng nhiệt thải pin nhiên liệu PEMFC (75°C).
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mật độ: {result.volumetricDensityKgH2PerM3} kg/m³</span>
            </span>
            <span className="px-3 py-1 bg-teal-900/60 border border-teal-500/40 rounded-lg text-teal-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Gauge className="w-3.5 h-3.5 text-teal-400" />
              <span>P_eq: {result.thermodynamics.plateauEquilibriumPressureBar} bar</span>
            </span>
            <span className="px-3 py-1 bg-blue-900/60 border border-blue-500/40 rounded-lg text-blue-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>Boil-off: 0.0%/ngày</span>
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-emerald-900/50">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION'
                ? 'bg-emerald-500 text-obsidian shadow-lg shadow-emerald-500/30 font-extrabold ring-2 ring-emerald-300'
                : 'bg-obsidian/40 text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-emerald-800/40'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>1. Đường Đẳng Nhiệt PCT & Cân Bằng Van 't Hoff</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SOLID_STATE_TANK_AND_FUEL_CELL_COUPLING');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'SOLID_STATE_TANK_AND_FUEL_CELL_COUPLING'
                ? 'bg-emerald-500 text-obsidian shadow-lg shadow-emerald-500/30 font-extrabold ring-2 ring-emerald-300'
                : 'bg-obsidian/40 text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-emerald-800/40'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>2. Bình Chứa Rắn & Ghép Nối Nhiệt Thải Pin PEMFC</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('STORAGE_TECH_COMPARISON_AND_SAFETY');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'STORAGE_TECH_COMPARISON_AND_SAFETY'
                ? 'bg-emerald-500 text-obsidian shadow-lg shadow-emerald-500/30 font-extrabold ring-2 ring-emerald-300'
                : 'bg-obsidian/40 text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-emerald-800/40'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>3. Đối Chiếu: Bình Rắn vs 700 bar vs Hydro Lỏng 20K</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PCT ISOTHERMS & VAN 'T HOFF SIMULATION */}
      {activeTab === 'PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Controls Column */}
          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/40 pb-3">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>Lựa Chọn Hợp Kim & Nhiệt Độ</span>
            </h3>

            {/* Alloy Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Hợp Kim Kim Loại Hydride (Alloy):</label>
              <div className="space-y-1.5">
                {(Object.keys(METAL_HYDRIDE_CATALOG) as HydrideAlloyClass[]).map(alloyKey => {
                  const item = METAL_HYDRIDE_CATALOG[alloyKey];
                  const isSelected = selectedAlloy === alloyKey;
                  return (
                    <button
                      key={alloyKey}
                      onClick={() => handleAlloyChange(alloyKey)}
                      className={`w-full p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">{item.name}</span>
                        <span className="font-mono text-[11px] opacity-80">{item.gravimetricCapacityWtPct} wt%</span>
                      </div>
                      <div className="text-[10px] opacity-75 mt-0.5">{item.chemicalFormula}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Nhiệt Độ Vận Hành Bình Chứa (T):</span>
                  <span className="font-mono text-emerald-400 font-bold">{operatingTemperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="400.0"
                  step="1.0"
                  value={operatingTemperatureC}
                  onChange={e => setOperatingTemperatureC(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Áp Suất Khí Hydro Cung Cấp (P_supply):</span>
                  <span className="font-mono text-teal-400 font-bold">{appliedSupplyPressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="35.0"
                  step="0.5"
                  value={appliedSupplyPressureBar}
                  onChange={e => setAppliedSupplyPressureBar(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Khối Lượng Hydro Mục Tiêu:</span>
                  <span className="font-mono text-white font-bold">{storageTargetH2Kg} kg H₂</span>
                </div>
                <input
                  type="range"
                  min="10.0"
                  max="150.0"
                  step="5.0"
                  value={storageTargetH2Kg}
                  onChange={e => setStorageTargetH2Kg(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Animated PCT Isotherms SVG Diagram */}
          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/40 pb-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Đường Đẳng Nhiệt Hấp Thụ PCT & Thềm Cân Bằng (Plateau)</span>
              </h3>

              {/* Interactive SVG Diagram */}
              <div className="mt-4 bg-slate-950/90 border border-emerald-950 rounded-xl p-4 flex items-center justify-center">
                <svg viewBox="0 0 440 280" className="w-full max-w-md h-auto font-sans">
                  {/* Axes */}
                  <line x1="50" y1="240" x2="410" y2="240" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="240" x2="50" y2="20" stroke="#64748b" strokeWidth="1.5" />

                  {/* Labels */}
                  <text x="230" y="265" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Nồng Độ Hydro Hấp Thụ Trong Hợp Kim (H/M hoặc wt%) →
                  </text>
                  <text x="25" y="130" fill="#94a3b8" fontSize="9" fontWeight="bold" transform="rotate(-90 25,130)" textAnchor="middle">
                    Áp Suất Khí Hydro P (bar) →
                  </text>

                  {/* Alpha phase (solid solution) */}
                  <path d="M 50 235 Q 70 200 90 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="65" y="190" fill="#38bdf8" fontSize="8">Pha α</text>

                  {/* Two-phase plateau (alpha + beta co-existence) */}
                  <line x1="90" y1="140" x2="310" y2="135" stroke="#10b981" strokeWidth="3.5" />
                  <text x="200" y="125" fill="#34d399" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                    THỀM ĐẲNG NHIỆT (PLATEAU P_eq = {result.thermodynamics.plateauEquilibriumPressureBar} bar)
                  </text>

                  {/* Beta phase (hydride saturation) */}
                  <path d="M 310 135 Q 330 60 360 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="345" y="85" fill="#fbbf24" fontSize="8">Pha β</text>

                  {/* Desorption curve (Hysteresis loop) */}
                  <line x1="310" y1="150" x2="90" y2="155" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="200" y="170" fill="#6ee7b7" fontSize="8" textAnchor="middle">
                    Đường Nhả Hydro P_des = {result.thermodynamics.desorptionPressureBar} bar (Trễ)
                  </text>

                  {/* Applied Supply Pressure Line */}
                  <line x1="50" y1="90" x2="410" y2="90" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="360" y="84" fill="#fb7185" fontSize="8" fontWeight="bold">
                    P_supply = {appliedSupplyPressureBar} bar
                  </text>

                  {/* Driving force arrow */}
                  <line x1="200" y1="92" x2="200" y2="135" stroke="#fb7185" strokeWidth="1.5" />
                  <polygon points="200,138 197,130 203,130" fill="#fb7185" />
                  <text x="210" y="112" fill="#fda4af" fontSize="8">
                    Động lực: +{result.thermodynamics.drivingPressureGradientBar} bar
                  </text>
                </svg>
              </div>
            </div>

            {/* Van 't Hoff Equation Card */}
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <Info className="w-3.5 h-3.5" />
                <span>Định Luật Nhiệt Động Van 't Hoff:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-mono">
                ln(P_eq) = ΔH/(R·T) - ΔS/R
              </p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Khi tăng nhiệt độ T, áp suất thềm P_eq tăng theo hàm số mũ. Điều này cho phép nạp hydro ở nhiệt độ mát và nhả hydro áp suất cao chỉ bằng cách cấp nhiệt nhẹ!
              </p>
            </div>
          </div>

          {/* Right Column: Thermodynamics & Tank Sizing */}
          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/40 pb-3">
              <Box className="w-4 h-4 text-emerald-400" />
              <span>Kích Thước Bình & Cân Bằng Nhiệt</span>
            </h3>

            <div className="space-y-3">
              {/* Alloy Mass & Volume */}
              <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 flex justify-between items-center shadow-lg">
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Khối Lượng Hợp Kim Cần Thiết:</div>
                  <div className="text-2xl font-black text-white font-mono">
                    {result.alloyMassRequiredKg.toLocaleString()} kg
                  </div>
                  <div className="text-[11px] text-emerald-200/70 mt-0.5">
                    Thể tích bình chứa chất rắn: <span className="font-mono font-bold text-white">{(result.tankBedVolumeM3 * 1000).toFixed(0)} Lít</span> ({result.tankBedVolumeM3} m³)
                  </div>
                </div>
                <Scale className="w-8 h-8 text-emerald-400" />
              </div>

              {/* Status Feasibility */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Khả Thi Nạp Hydro (Charge):</span>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      result.thermodynamics.isThermodynamicallyFeasibleToCharge
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : 'bg-rose-950 text-rose-400 border border-rose-600'
                    }`}
                  >
                    {result.thermodynamics.isThermodynamicallyFeasibleToCharge ? 'NẠP ĐƯỢC (+ΔP)' : 'ÁP SUẤT CẤP KHÔNG ĐỦ'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nhiệt Độ Nhả Khí Ở 1 bar:</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {result.thermodynamics.desorptionTemperatureAt1BarC}°C
                  </span>
                </div>
              </div>

              {/* Enthalpy of Sorption */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nhiệt Lượng Tỏa Ra Khi Nạp:</span>
                  <span className="font-mono text-rose-400 font-bold">
                    {Math.round(result.thermalManagement.totalEnthalpyReleasedDuringChargeKj / 1000)} MJ ({result.thermalManagement.coolingPowerRequiredKwAt1HourRate} kW)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mật Độ Hydro Thể Tích:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {result.volumetricDensityKgH2PerM3} kg H₂/m³
                  </span>
                </div>
              </div>

              {/* Autothermal PEMFC Callout */}
              <div className="bg-teal-950/40 border border-teal-800/40 rounded-xl p-3 flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  <span className="font-bold text-teal-200">Ghép Nối Pin Nhiên Liệu:</span>{' '}
                  {result.thermalManagement.pemfcCouplingDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOLID-STATE TANK & FUEL CELL COUPLING */}
      {activeTab === 'SOLID_STATE_TANK_AND_FUEL_CELL_COUPLING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Internal Tank Architecture Schematic */}
          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/40 pb-3">
              <Box className="w-4 h-4 text-emerald-400" />
              <span>Cấu Trúc Lõi Bình Chứa Kim Loại Hydride & Ống Tản Nhiệt</span>
            </h3>

            {/* Tank Schematic SVG */}
            <div className="bg-slate-950/90 border border-emerald-950 rounded-xl p-4 flex items-center justify-center">
              <svg viewBox="0 0 440 240" className="w-full max-w-md h-auto font-sans">
                {/* Outer Vessel Wall */}
                <rect x="30" y="30" width="380" height="180" rx="20" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />

                {/* Hydride Powder Bed Filling */}
                <rect x="45" y="45" width="350" height="150" rx="12" fill="#0f172a" />
                <pattern id="powderPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1.5" fill="#10b981" opacity="0.4" />
                </pattern>
                <rect x="45" y="45" width="350" height="150" rx="12" fill="url(#powderPattern)" />

                {/* Internal Heat Exchanger Copper Tube Matrix with Fins */}
                <line x1="45" y1="90" x2="395" y2="90" stroke="#f59e0b" strokeWidth="6" />
                <line x1="45" y1="150" x2="395" y2="150" stroke="#f59e0b" strokeWidth="6" />

                {/* Thermal Fins */}
                <line x1="100" y1="60" x2="100" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="160" y1="60" x2="160" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="220" y1="60" x2="220" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="280" y1="60" x2="280" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="340" y1="60" x2="340" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Central Porous Sintered Metal H2 Gas Distribution Tube */}
                <line x1="45" y1="120" x2="395" y2="120" stroke="#38bdf8" strokeWidth="4" strokeDasharray="4 2" />
                <text x="220" y="115" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ỐNG KHÍ HYDRO BÁN THẤM XỐP KIM LOẠI
                </text>

                {/* Inlets and Outlets */}
                <text x="45" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold">Cổng Khí H₂ (2 bar)</text>
                <text x="330" y="24" fill="#f59e0b" fontSize="8" fontWeight="bold">Nước Làm Mát / Sưởi</text>
                <text x="220" y="200" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Bột Hợp Kim {result.alloyName} (Mật độ 115 kg/m³)
                </text>
              </svg>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5 text-slate-300">
              <div className="font-bold text-emerald-300">Công Nghệ Trao Đổi Nhiệt Tích Hợp (Internal Heat Exchanger):</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Bột hợp kim kim loại hydride có độ dẫn nhiệt thấp (~0.5 W/m K). Hệ thống ống đồng có cánh tản nhiệt nhôm đan xen giúp tản nhiệt hấp phụ nhanh chóng trong 15 phút, cho phép nạp đầy 50 kg hydro trong thời gian kỷ lục.
              </p>
            </div>
          </div>

          {/* Autothermal PEMFC Closed Thermal Loop */}
          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/40 pb-3">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Vòng Nhiệt Tự Cân Bằng (Autothermal Loop) Với Pin Nhiên Liệu</span>
              </h3>

              <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Nhiệt Thải Cung Cấp Năng Lượng Nhả Khí:</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                      Pin nhiên liệu PEMFC biến 50% hydro thành điện và 50% thành nhiệt thải ở 75°C. Nước làm mát nóng từ pin chảy trực tiếp vào bình LaNi₅, cung cấp chính xác lượng nhiệt thu vào (ΔH = +30.8 kJ/mol) để nhả khí hydro liên tục!
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Không Tiêu Tốn Điện Năng Sưởi Bình:</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                      Loại bỏ hoàn toàn điện trở sưởi phụ trợ, bảo toàn 100% điện năng xuất lưới của pin nhiên liệu cho hệ thống microgrid hoặc động cơ xe buýt điện.
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Cơ Chế Tự Điều Tiết Áp Suất Tự Nhiên:</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                      Nếu pin nhiên liệu dừng hoạt động, nhiệt thải ngừng cấp → bình nguội đi và áp suất nhả khí tự động giảm về 0, đóng vai trò như van khóa an toàn cơ học tự nhiên không bao giờ rò rỉ.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-xs">
              <div className="font-bold text-emerald-300">Hiệu Quả Năng Lượng Tổng Thể:</div>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Đạt hiệu suất chu trình khép kín (Round-trip efficiency) &gt; 92%, vượt xa tổn thất 30% của nén khí 700 bar và hóa lỏng 20K.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STORAGE TECH COMPARISON & SAFETY */}
      {activeTab === 'STORAGE_TECH_COMPARISON_AND_SAFETY' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Comparison Cards for 50 kg H2 Benchmark */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Solid-State Metal Hydride */}
            <div className="bg-slate-900/80 border-2 border-emerald-500/70 rounded-2xl p-5 space-y-3 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-obsidian text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
                KHUYẾN NGHỊ AN TOÀN
              </div>
              <div className="text-base font-black text-emerald-400">1. Bình Kim Loại Hydride (Solid)</div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Áp Suất Vận Hành:</span>
                  <span className="text-emerald-300 font-bold">{result.storageTechnologyComparison.solidHydrideTank.storagePressureBar} bar (&lt; 10 bar)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Bay Hơi:</span>
                  <span className="text-emerald-400 font-bold">0.0% / ngày</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Năng Lượng Nén:</span>
                  <span className="text-emerald-400 font-bold">{result.storageTechnologyComparison.solidHydrideTank.compressorEnergyPenaltyPct}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Thể Tích Bình (50 kg H₂):</span>
                  <span className="text-white font-bold">{result.storageTechnologyComparison.solidHydrideTank.tankVolumeLitersFor50Kg} Lít</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans pt-1">
                {result.storageTechnologyComparison.solidHydrideTank.safetyLevel}
              </p>
            </div>

            {/* 2. 700 Bar Compressed Gas */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="text-base font-black text-amber-400">2. Khí Nén 700 Bar (Compressed)</div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Áp Suất Vận Hành:</span>
                  <span className="text-amber-300 font-bold">700.0 bar (Cực cao)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Bay Hơi:</span>
                  <span className="text-slate-300">0.0% / ngày</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Năng Lượng Nén:</span>
                  <span className="text-rose-400 font-bold">{result.storageTechnologyComparison.compressedGas700Bar.compressorEnergyPenaltyPct}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Thể Tích Bình (50 kg H₂):</span>
                  <span className="text-white font-bold">{result.storageTechnologyComparison.compressedGas700Bar.tankVolumeLitersFor50Kg} Lít</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                {result.storageTechnologyComparison.compressedGas700Bar.safetyLevel}
              </p>
            </div>

            {/* 3. 20K Cryogenic Liquid */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="text-base font-black text-cyan-400">3. Hydro Lỏng 20K (Cryogenic)</div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Nhiệt Độ Vận Hành:</span>
                  <span className="text-cyan-300 font-bold">-253°C (20.3 Kelvin)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Bay Hơi (Boil-off):</span>
                  <span className="text-rose-400 font-bold">{result.storageTechnologyComparison.cryogenicLiquid20K.dailyBoilOffLossPct}% / ngày</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Tổn Thất Hóa Lỏng:</span>
                  <span className="text-rose-400 font-bold">{result.storageTechnologyComparison.cryogenicLiquid20K.compressorEnergyPenaltyPct}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Thể Tích Bình (50 kg H₂):</span>
                  <span className="text-white font-bold">{result.storageTechnologyComparison.cryogenicLiquid20K.tankVolumeLitersFor50Kg} Lít</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                {result.storageTechnologyComparison.cryogenicLiquid20K.safetyLevel}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
