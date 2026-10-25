// src/components/visualizations/MetalHydrideThermalStorageVisualizer.tsx
// Interactive Visualizer: High-Temperature Metal Hydride Thermochemical Thermal Energy Storage (TCS) & Heat Pump
// Conforms to: Van 't Hoff Isotherm Thermodynamics, Dual-Bed Heat Upgrading, ENG Conductivity Intensification & Vietnam GDPT 2018

import React, { useState, useMemo } from 'react';
import {
  Flame,
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
  Sun,
  Thermometer
} from 'lucide-react';
import {
  HighTempHydrideType,
  LowTempCoupledHydrideType,
  ThermalConductivityEnhancementType,
  HIGH_TEMP_HYDRIDE_CATALOG,
  LOW_TEMP_COUPLED_CATALOG,
  CONDUCTIVITY_ENHANCEMENT_CATALOG,
  calculateVanTHoffEquilibriumPressureBar,
  calculateDualBedHeatPump,
  calculateTcsPlantBalance,
  THERMAL_STORAGE_BENCHMARKS
} from '../../domain/metalHydrideThermalStorageEngine';
import { sound } from '../../audio/soundEngine';

type TcsTabMode =
  | 'DUAL_BED_HEAT_PUMP_AND_FLOW'
  | 'PLANT_SCALE_TCS_SIMULATOR'
  | 'VAN_T_HOFF_ISOTHERM_AND_BENCHMARK';

export const MetalHydrideThermalStorageVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TcsTabMode>('DUAL_BED_HEAT_PUMP_AND_FLOW');

  // Mode 1: Dual Bed Heat Pump controls
  const [selectedHighHydride, setSelectedHighHydride] = useState<HighTempHydrideType>('MAGNESIUM_MGH2');
  const [selectedLowHydride, setSelectedLowHydride] = useState<LowTempCoupledHydrideType>('LANI5_STANDARD');
  const [highBedOperatingTempC, setHighBedOperatingTempC] = useState<number>(380);
  const [wasteHeatSourceTempC, setWasteHeatSourceTempC] = useState<number>(80);

  // Mode 2: Plant Scale TCS controls
  const [storageCapacityMwhTh, setStorageCapacityMwhTh] = useState<number>(10);
  const [selectedEnhancement, setSelectedEnhancement] = useState<ThermalConductivityEnhancementType>(
    'EXPANDED_NATURAL_GRAPHITE_ENG_10PCT'
  );

  // Mode 3: Van 't Hoff Isotherm explorer
  const [explorerTempC, setExplorerTempC] = useState<number>(350);

  // Calculations
  const heatPump = useMemo(() => {
    return calculateDualBedHeatPump({
      highTempHydride: selectedHighHydride,
      lowTempHydride: selectedLowHydride,
      highBedOperatingTempC,
      wasteHeatSourceTempC
    });
  }, [selectedHighHydride, selectedLowHydride, highBedOperatingTempC, wasteHeatSourceTempC]);

  const plantBalance = useMemo(() => {
    return calculateTcsPlantBalance({
      storageCapacityMwhTh,
      highTempHydride: selectedHighHydride,
      lowTempHydride: selectedLowHydride,
      conductivityEnhancement: selectedEnhancement,
      chargingTempC: highBedOperatingTempC + 40,
      dischargingTempC: highBedOperatingTempC
    });
  }, [
    storageCapacityMwhTh,
    selectedHighHydride,
    selectedLowHydride,
    selectedEnhancement,
    highBedOperatingTempC
  ]);

  const explorerPressure = useMemo(() => {
    const mat = HIGH_TEMP_HYDRIDE_CATALOG[selectedHighHydride];
    return calculateVanTHoffEquilibriumPressureBar(
      mat.reactionEnthalpyDeltaHKjPerMolH2,
      mat.reactionEntropyDeltaSJPerMolK,
      explorerTempC
    );
  }, [selectedHighHydride, explorerTempC]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-400 shadow-inner">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Lưu Trữ Nhiệt Hóa Học Hydrit Kim Loại (TCS) &amp; Bơm Nhiệt Nhiệt Độ Cao
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                MgH₂ ⇌ Mg + H₂ (785 kWh/tấn)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Lưu trữ nhiệt vô hạn ở nhiệt độ phòng không suy hao (0.0%/ngày), nâng nhiệt thải 80°C thành hơi công nghiệp 380°C với COP = {heatPump.coefficientOfPerformanceCopHeating}
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('DUAL_BED_HEAT_PUMP_AND_FLOW');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'DUAL_BED_HEAT_PUMP_AND_FLOW'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Bơm Nhiệt 2 Bình &amp; Nâng Nhiệt
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PLANT_SCALE_TCS_SIMULATOR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PLANT_SCALE_TCS_SIMULATOR'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Mô Phỏng Trạm TCS (MWh-th)
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('VAN_T_HOFF_ISOTHERM_AND_BENCHMARK');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'VAN_T_HOFF_ISOTHERM_AND_BENCHMARK'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Đẳng Nhiệt Van 't Hoff &amp; So Sánh
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* MODE 1: DUAL BED HEAT PUMP & FLOW */}
        {activeMode === 'DUAL_BED_HEAT_PUMP_AND_FLOW' && (
          <div className="space-y-6">
            {/* Interactive SVG Diagram */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Sơ Đồ Bơm Nhiệt Nâng Cấp Nhiệt Thải 2 Bình Hydrit (COP = {heatPump.coefficientOfPerformanceCopHeating})
                </span>
                <span className="text-[11px] text-slate-400">
                  Nâng nhiệt độ lift: +{heatPump.temperatureLiftDeltaTDegC}°C (Từ {wasteHeatSourceTempC}°C lên {highBedOperatingTempC}°C)
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
                <svg viewBox="0 0 900 280" className="w-full max-w-4xl h-auto select-none">
                  {/* High Temperature Reactor Bed (Left) */}
                  <rect x="60" y="40" width="320" height="200" rx="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                  <text x="220" y="68" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Bình Phản Ứng Nhiệt Độ Cao (High-T Bed)
                  </text>
                  <text x="220" y="86" fill="#fda4af" fontSize="11" textAnchor="middle">
                    MgH₂ ⇌ Mg + H₂ (ΔH = +74.5 kJ/mol)
                  </text>

                  {/* High Temp Bed Internals: Matrix of ENG compacts */}
                  {[0, 1, 2, 3].map(row => (
                    <g key={row}>
                      <rect x="85" y={105 + row * 26} width="270" height="18" rx="3" fill="#1e293b" stroke="#e11d48" strokeWidth="1" />
                      <line x1="90" y1={114 + row * 26} x2="350" y2={114 + row * 26} stroke="#fb7185" strokeWidth="1" strokeDasharray="3 3" />
                    </g>
                  ))}
                  <text x="220" y="225" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    T = {highBedOperatingTempC}°C • P_plateau = {heatPump.highBedPlateauPressureBar} bar
                  </text>

                  {/* High Temp Output Arrow */}
                  <line x1="220" y1="40" x2="220" y2="15" stroke="#f43f5e" strokeWidth="3" />
                  <text x="220" y="10" fill="#fb7185" fontSize="10" fontWeight="black" textAnchor="middle">
                    🔥 HƠI QUÁ NHIỆT {highBedOperatingTempC}°C (Cấp Tuabin / Công Nghiệp)
                  </text>

                  {/* Central Hydrogen Flow Tube */}
                  <line x1="380" y1="140" x2="520" y2="140" stroke="#06b6d4" strokeWidth="6" />
                  <circle cx="450" cy="140" r="14" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                  <text x="450" y="144" fill="#67e8f9" fontSize="11" fontWeight="black" textAnchor="middle">
                    H₂
                  </text>
                  <text x="450" y="170" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    Van Điều Tiết Khí Hydro
                  </text>

                  {/* Low Temperature Coupled Reactor Bed (Right) */}
                  <rect x="520" y="40" width="320" height="200" rx="14" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="680" y="68" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Bình Đệm Nhiệt Thấp (Low-T Bed)
                  </text>
                  <text x="680" y="86" fill="#7dd3fc" fontSize="11" textAnchor="middle">
                    LaNi₅H₆ ⇌ LaNi₅ + 3 H₂ (ΔH = -30.8 kJ/mol)
                  </text>

                  {/* Low Temp Bed Internals */}
                  {[0, 1, 2, 3].map(row => (
                    <g key={row}>
                      <rect x="545" y={105 + row * 26} width="270" height="18" rx="3" fill="#1e293b" stroke="#0284c7" strokeWidth="1" />
                      <line x1="550" y1={114 + row * 26} x2="810" y2={114 + row * 26} stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                    </g>
                  ))}
                  <text x="680" y="225" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    T = {wasteHeatSourceTempC}°C • P_plateau = {heatPump.lowBedPlateauPressureBar} bar
                  </text>

                  {/* Waste Heat Input Arrow */}
                  <line x1="680" y1="240" x2="680" y2="265" stroke="#f59e0b" strokeWidth="3" />
                  <text x="680" y="275" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ♨ CẤP NHIỆT THẢI CÔNG NGHIỆP {wasteHeatSourceTempC}°C
                  </text>
                </svg>
              </div>
            </div>

            {/* Controls for High and Low Bed */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* High Bed Operating Temp */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nhiệt Độ Xả Cao (T_high):</span>
                  <span className="text-rose-400 font-bold">{highBedOperatingTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="450"
                  step="5"
                  value={highBedOperatingTempC}
                  onChange={e => {
                    sound.playUiClick();
                    setHighBedOperatingTempC(parseInt(e.target.value));
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">
                  Áp suất cân bằng: <span className="font-mono text-rose-300">{heatPump.highBedPlateauPressureBar} bar</span>
                </div>
              </div>

              {/* Low Bed Waste Heat Temp */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nhiệt Thải Cấp Vào (T_waste):</span>
                  <span className="text-amber-400 font-bold">{wasteHeatSourceTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="5"
                  value={wasteHeatSourceTempC}
                  onChange={e => {
                    sound.playUiClick();
                    setWasteHeatSourceTempC(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">
                  Áp suất cân bằng: <span className="font-mono text-amber-300">{heatPump.lowBedPlateauPressureBar} bar</span>
                </div>
              </div>

              {/* High Temp Hydride Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Hydrit Nhiệt Độ Cao:</label>
                <select
                  value={selectedHighHydride}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedHighHydride(e.target.value as HighTempHydrideType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-rose-300 focus:outline-none focus:border-rose-500"
                >
                  {Object.values(HIGH_TEMP_HYDRIDE_CATALOG).map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name} (ΔH = {h.reactionEnthalpyDeltaHKjPerMolH2} kJ/mol)
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {HIGH_TEMP_HYDRIDE_CATALOG[selectedHighHydride].description}
                </div>
              </div>

              {/* Low Temp Coupled Hydride Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Hydrit Đệm Nhiệt Thấp:</label>
                <select
                  value={selectedLowHydride}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedLowHydride(e.target.value as LowTempCoupledHydrideType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                >
                  {Object.values(LOW_TEMP_COUPLED_CATALOG).map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {LOW_TEMP_COUPLED_CATALOG[selectedLowHydride].description}
                </div>
              </div>
            </div>

            {/* Performance Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Hệ Số Làm Nóng (COP Heating):</span>
                <div className="text-xl font-black text-rose-400 font-mono">{heatPump.coefficientOfPerformanceCopHeating}</div>
                <span className="text-[10px] text-slate-500">Mỗi 1 kW nhiệt thải sinh 2.4 kW hơi</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Độ Nâng Nhiệt (Temperature Lift):</span>
                <div className="text-xl font-black text-amber-400 font-mono">+{heatPump.temperatureLiftDeltaTDegC}°C</div>
                <span className="text-[10px] text-slate-500">Nâng cấp từ nhiệt thấp lên cao</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Hiệu Suất Exergy Nâng Nhiệt:</span>
                <div className="text-xl font-black text-emerald-400 font-mono">{heatPump.heatUpgradingEfficiencyPct}%</div>
                <span className="text-[10px] text-slate-500">Tối ưu hóa nhiệt động lực học</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Hệ Số Làm Lạnh (COP Cooling):</span>
                <div className="text-xl font-black text-cyan-400 font-mono">{heatPump.coefficientOfPerformanceCopCooling}</div>
                <span className="text-[10px] text-slate-500">Chế độ điều hòa / cấp lạnh</span>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: PLANT SCALE TCS SIMULATOR */}
        {activeMode === 'PLANT_SCALE_TCS_SIMULATOR' && (
          <div className="space-y-6">
            {/* Input Controls */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-rose-400" />
                Quy Mô Trạm Lưu Trữ Nhiệt Hóa Học TCS (Thermochemical Storage)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Dung lượng nhiệt lưu trữ:</span>
                    <span className="font-bold text-rose-400">{storageCapacityMwhTh} MWh-th</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={storageCapacityMwhTh}
                    onChange={e => {
                      sound.playUiClick();
                      setStorageCapacityMwhTh(parseInt(e.target.value));
                    }}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    Quy mô phù hợp tích hợp nhà máy điện mặt trời tập trung CSP hoặc nhiệt dư công nghiệp
                  </div>
                </div>

                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300">Công Nghệ Tăng Cường Dẫn Nhiệt (k_eff):</label>
                  <select
                    value={selectedEnhancement}
                    onChange={e => {
                      sound.playUiClick();
                      setSelectedEnhancement(e.target.value as ThermalConductivityEnhancementType);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 focus:outline-none focus:border-amber-500"
                  >
                    {Object.values(CONDUCTIVITY_ENHANCEMENT_CATALOG).map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} (k: {c.effectiveThermalConductivityWPerMK} W/mK)
                      </option>
                    ))}
                  </select>
                  <div className="text-[10px] text-slate-400">
                    {CONDUCTIVITY_ENHANCEMENT_CATALOG[selectedEnhancement].description}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-rose-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Khối Lượng Hydrit MgH₂</span>
                  <Factory className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-black text-rose-300">
                  {plantBalance.massOfHighTempHydrideTons} <span className="text-sm font-normal text-rose-400">tấn</span>
                </div>
                <div className="text-xs text-slate-400">
                  Mật độ lưu trữ cực cao: <span className="font-semibold text-rose-300">{(storageCapacityMwhTh * 1000 / plantBalance.massOfHighTempHydrideTons).toFixed(0)} kWh-th/tấn</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Khí Hydro Tuần Hoàn Kín</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">
                  {plantBalance.hydrogenCirculatedKg.toLocaleString()} <span className="text-sm font-normal text-cyan-400">kg H₂</span>
                </div>
                <div className="text-xs text-slate-400">
                  Chu trình kín 100%, không tiêu hao hóa chất
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Thời Gian Nạp / Xả Nhiệt</span>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300">
                  {plantBalance.chargingDurationHours} <span className="text-sm font-normal text-amber-400">giờ</span>
                </div>
                <div className="text-xs text-slate-400">
                  Công suất nạp/xả: <span className="font-semibold text-amber-300">{plantBalance.chargingPowerMwTh} MWth</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Suy Hao Nhiệt Khi Lưu Trữ</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-300">
                  0.0% <span className="text-sm font-normal text-emerald-400">/ ngày</span>
                </div>
                <div className="text-xs text-slate-400">
                  Lưu trữ dạng kim loại nguội ở nhiệt độ phòng
                </div>
              </div>
            </div>

            {/* Environmental Savings Banner */}
            <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-emerald-950/40 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Khí Đốt Hóa Thạch Tránh Tiêu Thụ &amp; Cắt Giảm Phát Thải CO₂
                </div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  {plantBalance.avoidedCo2TonsPerYear.toLocaleString()} Tấn CO₂ / năm
                </div>
              </div>
              <div className="text-xs text-slate-400 text-right">
                <div>Thay thế {plantBalance.displacedNaturalGasMmbtsPerCycle.toLocaleString()} MMBtu khí đốt mỗi chu kỳ</div>
                <div>Hiệu suất chu trình nhiệt khứ hồi (RTE): {plantBalance.roundTripThermalEfficiencyPct}%</div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: VAN 'T HOFF ISOTHERM & BENCHMARK */}
        {activeMode === 'VAN_T_HOFF_ISOTHERM_AND_BENCHMARK' && (
          <div className="space-y-6">
            {/* Van 't Hoff Explorer */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-rose-400" />
                Khảo Sát Áp Suất Cân Bằng Đẳng Nhiệt Van 't Hoff: ln(P) = -ΔH/(RT) + ΔS/R
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Nhiệt Độ Khảo Sát:</span>
                    <span className="text-rose-400 font-bold">{explorerTempC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="450"
                    step="5"
                    value={explorerTempC}
                    onChange={e => {
                      sound.playUiClick();
                      setExplorerTempC(parseInt(e.target.value));
                    }}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Nhiệt độ phân hủy ở 1 atm: <span className="font-bold text-rose-300">{HIGH_TEMP_HYDRIDE_CATALOG[selectedHighHydride].decompositionTempAt1BarC}°C</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Áp suất cân bằng (P_eq):</span>
                    <span className="font-bold text-rose-400 font-mono text-base">{explorerPressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entanpy phản ứng (ΔH):</span>
                    <span className="font-bold text-slate-200">{HIGH_TEMP_HYDRIDE_CATALOG[selectedHighHydride].reactionEnthalpyDeltaHKjPerMolH2} kJ/mol H₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entropi phản ứng (ΔS):</span>
                    <span className="font-bold text-slate-200">{HIGH_TEMP_HYDRIDE_CATALOG[selectedHighHydride].reactionEntropyDeltaSJPerMolK} J/(mol·K)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benchmark Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-400" />
                So Sánh 4 Công Nghệ Lưu Trữ Nhiệt Năng Lượng Công Nghiệp
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border-collapse">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Công Nghệ</th>
                      <th className="py-2.5 px-3">Nguyên Lý Lưu Trữ</th>
                      <th className="py-2.5 px-3">Mật Độ Nhiệt</th>
                      <th className="py-2.5 px-3">Mất Nhiệt Mỗi Ngày</th>
                      <th className="py-2.5 px-3">Thời Gian Lưu Trữ</th>
                      <th className="py-2.5 px-3">Hiệu Suất RTE</th>
                      <th className="py-2.5 px-3">An Toàn Môi Trường</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {THERMAL_STORAGE_BENCHMARKS.map((b, idx) => (
                      <tr key={idx} className={b.technologyName.includes('Metal Hydride') ? 'bg-rose-950/20 font-semibold' : 'hover:bg-slate-900/50'}>
                        <td className="py-2.5 px-3 font-bold text-slate-100">{b.technologyName}</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.storagePrinciple}</td>
                        <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">{b.energyDensityKwhPerM3} kWh/m³</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-400">{b.thermalDegradationPerDayPct}</td>
                        <td className="py-2.5 px-3 text-cyan-300 font-semibold">{b.maxStorageDuration}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-200">{b.roundTripEfficiencyPct}%</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.environmentalSafety}</td>
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
          <Flame className="w-4 h-4 text-rose-400" />
          <span>
            Thermochemical Storage (TCS) • MgH₂ (1,550 kWh/m³) • COP Bơm Nhiệt = {heatPump.coefficientOfPerformanceCopHeating} • 0.0% Suy Hao Nhiệt / Ngày
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          k_eff = {CONDUCTIVITY_ENHANCEMENT_CATALOG[selectedEnhancement].effectiveThermalConductivityWPerMK} W/(m·K) • RTE = {plantBalance.roundTripThermalEfficiencyPct}%
        </div>
      </div>
    </div>
  );
};
